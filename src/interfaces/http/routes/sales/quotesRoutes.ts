import * as quoteController from "@controllers/sales/quoteController";
import roleMiddleware from "@interfaces/http/middleware/roleMiddleware";
import express from "express";

const router = express.Router();

// Define routes with role-based access control
router.get(
  "/",
  roleMiddleware(["admin", "manager"]),
  quoteController.getAllQuotes,
);
router.get(
  "/:quoteId",
  roleMiddleware(["admin", "manager", "user"]),
  quoteController.getQuoteById,
);
router.post(
  "/",
  roleMiddleware(["admin", "manager"]),
  quoteController.createQuote,
);
router.put(
  "/:quoteId",
  roleMiddleware(["admin", "manager"]),
  quoteController.updateQuote,
);
router.delete(
  "/:quoteId",
  roleMiddleware(["admin"]),
  quoteController.deleteQuote,
);

export default router;
