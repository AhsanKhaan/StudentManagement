const { check, validationResult } = require('express-validator');

const createUserValidation = [
    check('username').notEmpty().withMessage('username is Required!'),
    check('email').isEmail().withMessage('Email is required.'),
    check('password').isLength({ min: 6 }).withMessage('Password must contain 6 Characters'),
    // check('password').isStrongPassword().withMessage('Password must be strong (include uppercase, lowercase, number, and special character).'),
];

const userLoginValidation = [
    check('email').isEmail().withMessage('Email is required.'),
    check('password').isLength({ min: 6 }).withMessage('Password must contain 6 Characters'),
    // check('password').isStrongPassword().withMessage('Password must be strong (include uppercase, lowercase, number, and special character).'),
];


const validateRequest=(validations)=>{
    return async (request,response,next)=>{
        await Promise.all(validations.map((validation)=>{validation.run(request)}));

        const errors = validationResult(request);
        if (errors.isEmpty()) {
          return next();
        }
    
        return response.status(400).json({ errors: errors.array() });

    }
}


module.exports ={
    createUserValidation    : validateRequest(createUserValidation),
    userLoginValidation     : validateRequest(userLoginValidation),
}