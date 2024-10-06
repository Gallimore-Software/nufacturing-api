"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createRouter;
const express_1 = __importDefault(require("express"));
const userController = __importStar(require("@interfaces/http/controllers/user/userController"));
const authController_1 = require("../../controllers/authController");
const roleMiddleware_1 = __importDefault(require("@middleware/roleMiddleware"));
function createRouter() {
    const router = express_1.default.Router();
    // Define routes with role-based access control
    router.get("/all-users", (0, roleMiddleware_1.default)(["admin", "manager"]), userController.getAllUsers);
    router.get("/all-users/:_id", (0, roleMiddleware_1.default)(["admin", "manager", "user"]), userController.getUserById);
    router.post("/create-user", userController.createUser);
    router.put("/update-user/:_id", (0, roleMiddleware_1.default)(["admin", "manager"]), userController.updateUser);
    router.delete("/delete-user/:_id", (0, roleMiddleware_1.default)(["admin"]), userController.deleteUser);
    router.get("/verify/:token", authController_1.verifyEmail);
    router.post("/login", userController.loginUser);
    return router;
}
