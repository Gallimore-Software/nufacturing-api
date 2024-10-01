const { body, validationResult } = require("express-validator");

exports.validateInventoryItem = [
  body("name").notEmpty().withMessage("Name is required").isString(),
  body("quantity")
    .notEmpty()
    .withMessage("Quantity is required")
    .isInt({ min: 1 })
    .withMessage("Quantity must be an integer greater than 0"),
  body("vendor")
    .optional()
    .isMongoId()
    .withMessage("Vendor ID must be a valid MongoDB ID"),
  // Add more fields based on your requirements

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];
