import { Request, Response, NextFunction } from 'express';
import { body, validationResult } from 'express-validator';

// Error handler middleware
export const handleValidationErrors = (
  req: Request,
  res: Response,
  next: NextFunction
): void | Response => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() }); // Returning response in case of validation failure
  }
  return next(); // Ensuring that next() is returned in the valid case
};

// Validation rules for login
export const validateLogin = [
  body('email').isEmail().withMessage('Email must be valid'),
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
  handleValidationErrors, // Attach the error handler middleware
];
