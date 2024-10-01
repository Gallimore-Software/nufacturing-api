"use strict";
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const formulaController_1 = __importDefault(
  require("../../../../controllers/product-development-controller/formulaController"),
);
const roleMiddlewaree_1 = __importDefault(
  require("../../middleware/roleMiddlewaree"),
);
const router = express_1.default.Router();
router.get(
  "/",
  (0, roleMiddlewaree_1.default)(["admin", "manager"]),
  formulaController_1.default.getAllFormulas,
);
router.get(
  "/:entity_id",
  (0, roleMiddlewaree_1.default)(["admin", "manager", "user"]),
  formulaController_1.default.getFormulaById,
);
router.post(
  "/",
  (0, roleMiddlewaree_1.default)(["admin", "manager"]),
  formulaController_1.default.createFormula,
);
router.put(
  "/:entity_id",
  (0, roleMiddlewaree_1.default)(["admin", "manager"]),
  formulaController_1.default.updateFormula,
);
router.delete(
  "/:entity_id",
  (0, roleMiddlewaree_1.default)(["admin"]),
  formulaController_1.default.deleteFormula,
);
module.exports = router;
//# sourceMappingURL=formulasRoutes.js.map
