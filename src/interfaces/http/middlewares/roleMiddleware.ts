import jwt from "jsonwebtoken";
import User from "@models/userModel";

const roleMiddleware = (roles) => {
  return async (req, res, next) => {
    try {
      const token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!roles.includes(user.role)) {
        return res.status(403).json({ message: "Access denied" });
      }

      req.user = user;
      next();
    } catch (err) {
      res.status(401).json({ message: "Unauthorized", err: err });
    }
  };
};

export default roleMiddleware;
