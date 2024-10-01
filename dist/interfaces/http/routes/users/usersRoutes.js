"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = createRouter;
const express_1 = __importDefault(require("express"));
const userController_1 = __importDefault(
  require("../../controllers/users/userController"),
);
const authController_1 = require("../../controllers/authController");
const roleMiddleware_1 = __importDefault(
  require("../middleware/roleMiddleware"),
);
function createRouter() {
  const router = express_1.default.Router();
  // Define routes with role-based access control
  router.get(
    "/all-users",
    (0, roleMiddleware_1.default)(["admin", "manager"]),
    userController_1.default.getAllUsers,
  );
  router.get(
    "/all-users/:_id",
    (0, roleMiddleware_1.default)(["admin", "manager", "user"]),
    userController_1.default.getUserById,
  );
  router.post("/create-user", userController_1.default.createUser);
  router.put(
    "/update-user/:_id",
    (0, roleMiddleware_1.default)(["admin", "manager"]),
    userController_1.default.updateUser,
  );
  router.delete(
    "/delete-user/:_id",
    (0, roleMiddleware_1.default)(["admin"]),
    userController_1.default.deleteUser,
  );
  router.get("/verify/:token", authController_1.verifyEmail);
  router.post("/login", userController_1.default.loginUser);
  return router;
}
//# sourceMappingURL=usersRoutes.js.map
