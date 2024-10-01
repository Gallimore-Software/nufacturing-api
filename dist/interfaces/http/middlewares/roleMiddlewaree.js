"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const userModel_1 = __importDefault(require("../models/userModel"));
const roleMiddleware = (roles) => {
  return (req, res, next) =>
    __awaiter(void 0, void 0, void 0, function* () {
      try {
        const token = req.headers.authorization.split(" ")[1];
        const decoded = jsonwebtoken_1.default.verify(
          token,
          process.env.JWT_SECRET,
        );
        const user = yield userModel_1.default.findById(decoded.id);
        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }
        if (!roles.includes(user.role)) {
          return res.status(403).json({ message: "Access denied" });
        }
        req.user = user;
        next();
      } catch (error) {
        res.status(401).json({ message: "Unauthorized", error });
      }
    });
};
module.exports = roleMiddleware;
//# sourceMappingURL=roleMiddlewaree.js.map
