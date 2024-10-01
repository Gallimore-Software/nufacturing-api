"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const quoteController_1 = __importDefault(
  require("../../controllers/sales/quoteController"),
);
const roleMiddlewaree_1 = __importDefault(
  require("../../middleware/roleMiddlewaree"),
);
const router = express_1.default.Router();
// Define routes with role-based access control
router.get(
  "/",
  (0, roleMiddlewaree_1.default)(["admin", "manager"]),
  quoteController_1.default.getAllQuotes,
);
router.get(
  "/:quoteId",
  (0, roleMiddlewaree_1.default)(["admin", "manager", "user"]),
  quoteController_1.default.getQuoteById,
);
router.post(
  "/",
  (0, roleMiddlewaree_1.default)(["admin", "manager"]),
  quoteController_1.default.createQuote,
);
router.put(
  "/:quoteId",
  (0, roleMiddlewaree_1.default)(["admin", "manager"]),
  quoteController_1.default.updateQuote,
);
router.delete(
  "/:quoteId",
  (0, roleMiddlewaree_1.default)(["admin"]),
  quoteController_1.default.deleteQuote,
);
module.exports = router;
//# sourceMappingURL=quotesRoutes.js.map
