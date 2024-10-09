import * as formulaController from "@interfaces/http/controllers/formula/formula.controller";
import roleMiddleware from "@interfaces/http/middleware/role.middleware";
import express from "express";

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

export default router;
