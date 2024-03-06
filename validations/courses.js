const { check, validationResult } = require('express-validator');

const getAllcourse=[
    check('category').optional().isAlpha().withMessage('Valid Category is required.'),
];
const createCourseValidation=[
    check('name').matches('^([a-zA-Z ]+)$').withMessage('Valid Name is required!'),
    check('description').optional().isString().withMessage('Description Should Be Valid!'),
    check('slug').isSlug().withMessage('valid slug is Required!.'),
    check('category').isString().isIn(["DIGITAL_MARKETING","E_COMMERCE","CYBER_SECURITY","WEB_DEVELOPMENT"]).withMessage('Valid Category is required!')
];

const validateRequest = (validations) => {
    return async (req, res, next) => {
      await Promise.all(validations.map(validation => validation.run(req)));
  
      const errors = validationResult(req);
      if (errors.isEmpty()) {
        return next();
      }
  
      return res.status(400).json({ errors: errors.array() });
    };
  };
module.exports ={
    getAllCourses:validateRequest(getAllcourse),
    createCourseValidation:validateRequest(createCourseValidation),
}