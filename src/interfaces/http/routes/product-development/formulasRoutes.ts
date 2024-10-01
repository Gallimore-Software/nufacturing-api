const express = require("express");
const formulaController = require("../../../../controllers/product-development-controller/formulaController");
const roleMiddleware = require("../../middleware/roleMiddlewaree");

const router = express.Router();

router.get(
  "/",
  roleMiddleware(["admin", "manager"]),
  formulaController.getAllFormulas,
);
router.get(
  "/:entity_id",
  roleMiddleware(["admin", "manager", "user"]),
  formulaController.getFormulaById,
);
router.post(
  "/",
  roleMiddleware(["admin", "manager"]),
  formulaController.createFormula,
);
router.put(
  "/:entity_id",
  roleMiddleware(["admin", "manager"]),
  formulaController.updateFormula,
);
router.delete(
  "/:entity_id",
  roleMiddleware(["admin"]),
  formulaController.deleteFormula,
);

module.exports = router;
