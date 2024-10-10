import { body, ValidationError, validationResult } from 'express-validator';
import { Request, Response, NextFunction } from 'express';

// Validation rules for inventory item
const validateInventoryItem = [
  // Ensure the name is provided and is a string
  body('name').notEmpty().withMessage('Name is required').isString(),

  // Ensure the quantity is provided and is an integer greater than 0
  body('quantity')
    .notEmpty()
    .withMessage('Quantity is required')
    .isInt({ min: 1 })
    .withMessage('Quantity must be an integer greater than 0'),

  // Optional vendor ID, but if provided, it must be a valid MongoDB ObjectId
  body('vendor')
    .optional()
    .isMongoId()
    .withMessage('Vendor ID must be a valid MongoDB ID'),

  // Custom validation result handler
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];

export default validateInventoryItem;
