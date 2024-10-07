import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  username: string;
  password: string;
  email: string;
  role: "user" | "admin" | "manager";
  phoneNumber: string;
  createdAt: Date;
  emailVerified: boolean;
}

const userSchema = new Schema<IUser>({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: { type: String, enum: ["user", "admin", "manager"], default: "user" },
  phoneNumber: { type: String, required: true },
  createdAt: { type: Date, default: Date.now },
  emailVerified: { type: Boolean, default: false },
});

const User = mongoose.model<IUser>("User", userSchema);

export default User;
