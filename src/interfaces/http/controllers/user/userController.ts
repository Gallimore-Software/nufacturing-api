import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { UserDTO } from "@dto/userDTO";
import User, { IUser } from "@infrastructure/persistence/models/userModel";
import { UserMapper } from "@app/mappers/userMapper";
import sendEmail from "@infrastructure/notifications/sendEmail";
import Joi from "joi";

// Joi validation schema
const userSchema = Joi.object({
  username: Joi.string().min(3).max(30).required(),
  password: Joi.string().min(6).required(),
  email: Joi.string().email().required(),
  role: Joi.string().valid("user", "admin", "manager").default("user"),
  phoneNumber: Joi.string()
    .pattern(/^[0-9]{10,15}$/)
    .optional(),
});

// Create a new user and issue JWT token
export const createUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Validate the request body
    const { error } = userSchema.validate(req.body);
    if (error) {
      res
        .status(400)
        .json({ message: "Validation error", error: error.details[0].message });
      return;
    }

    const userDTO: UserDTO = req.body;

    // Hash the password before saving
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(userDTO.password, saltRounds);

    const newUser: IUser = new User({
      ...userDTO,
      password: hashedPassword,
      verified: false,
    });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, role: newUser.role },
      process.env.JWT_SECRET!,
      { expiresIn: "5h" },
    );

    // Send verification email
    const verificationToken = jwt.sign(
      { id: newUser._id },
      process.env.JWT_SECRET!,
      { expiresIn: "7d" },
    );
    const verificationLink = `${process.env.LIVE_API_URL || "http://localhost:3000"}/api/users/verify/${verificationToken}`;
    await sendEmail(
      newUser.email,
      "Email Verification",
      `Please verify your email by clicking on the following link: ${verificationLink}`,
    );

    res.status(201).json({ user: UserMapper.toDTO(newUser), token });
  } catch (err) {
    res.status(400).json({
      message: "Error creating user",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

// Get all users
export const getAllUsers = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const users = await User.find();
    res.status(200).json(users.map(UserMapper.toDTO));
  } catch (err) {
    res.status(500).json({
      message: "Error fetching users",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

// Get a single user by ID
export const getUserById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(UserMapper.toDTO(user));
  } catch (err) {
    res.status(500).json({
      message: "Error fetching user",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

// Update a user by ID
export const updateUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // Validate the request body
    const { error } = userSchema.validate(req.body);
    if (error) {
      res
        .status(400)
        .json({ message: "Validation error", error: error.details[0].message });
      return;
    }

    const userDTO: UserDTO = req.body;

    const updatedUser = await User.findByIdAndUpdate(req.params.id, userDTO, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json(UserMapper.toDTO(updatedUser));
  } catch (err) {
    res.status(400).json({
      message: "Error updating user",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

// Delete a user by ID
export const deleteUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({
      message: "Error deleting user",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};

// Login user and issue JWT token
export const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    // Check if the email is verified
    if (!user.verified) {
      res.status(401).json({ message: "Email not verified" });
      return;
    }

    // Compare passwords
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET!,
      { expiresIn: "1h" },
    );

    // Respond with token and user info
    res.status(200).json({
      message: "Login successful",
      token,
      user: UserMapper.toDTO(user),
    });
  } catch (err) {
    res.status(500).json({
      message: "Error logging in",
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
};
