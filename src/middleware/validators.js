const { body } = require('express-validator');

const authValidators = {
  login: [
    body('email').isEmail().withMessage('Invalid email'),
    body('password').notEmpty().withMessage('Password is required')
  ],
  register: [
    body('email').isEmail().withMessage('Invalid email'),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters long')
  ]
};

const clientValidators = {
  create: [
    body('name').notEmpty().withMessage('Name is required'),
    body('email').isEmail().withMessage('Invalid email'),
    body('phone').optional().isMobilePhone().withMessage('Invalid phone number'),
    body('address').optional().isString().withMessage('Address must be a string'),
    body('company').optional().isString().withMessage('Company must be a string')
  ],
  update: [
    body('name').optional().notEmpty().withMessage('Name cannot be empty'),
    body('email').optional().isEmail().withMessage('Invalid email'),
    body('phone').optional().isMobilePhone().withMessage('Invalid phone number'),
    body('address').optional().isString().withMessage('Address must be a string'),
    body('company').optional().isString().withMessage('Company must be a string')
  ]
};

module.exports = {
  authValidators,
  clientValidators
}; 