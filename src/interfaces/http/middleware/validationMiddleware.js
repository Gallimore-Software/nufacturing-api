"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validateInventoryItem = [
    (0, express_validator_1.body)("name").notEmpty().withMessage("Name is required").isString(),
    (0, express_validator_1.body)("quantity")
        .notEmpty()
        .withMessage("Quantity is required")
        .isInt({ min: 1 })
        .withMessage("Quantity must be an integer greater than 0"),
    (0, express_validator_1.body)("vendor")
        .optional()
        .isMongoId()
        .withMessage("Vendor ID must be a valid MongoDB ID"),
    // Add more fields based on your requirements
    (req, res, next) => {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ success: false, errors: errors.array() });
        }
        next();
    },
];
exports.default = validateInventoryItem;
