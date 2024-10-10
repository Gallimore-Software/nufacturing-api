import { body, ValidationError, validationResult } from 'express-validator';
import { Request } from 'express-validator/lib/base';

const validateInventoryItem = [
  body('name').notEmpty().withMessage('Name is required').isString(),
  body('quantity')
    .notEmpty()
    .withMessage('Quantity is required')
    .isInt({ min: 1 })
    .withMessage('Quantity must be an integer greater than 0'),
  body('vendor')
    .optional()
    .isMongoId()
    .withMessage('Vendor ID must be a valid MongoDB ID'),
  // Add more fields based on your requirements

  (
    req: Request,
    res: {
      status: (arg0: number) => {
        (): any;
        new (): any;
        json: {
          (arg0: { success: boolean; errors: ValidationError[] }): any;
          new (): any;
        };
      };
    },
    next: () => void
  ) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
  },
];

export default validateInventoryItem;
