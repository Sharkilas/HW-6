import {body, validationResult} from "express-validator";

export const loginValidation = body("login").exists().isString().trim().notEmpty().isLength({min: 3, max: 10});
// export const nameBlogValidation = body("email").exists().isString().trim().notEmpty().isLength({max: 15});
// export const descriptionBlogValidation = body("description").exists().isString().trim().notEmpty().isLength({max: 500});
export const emailValidation = body("email").exists().isString().isEmail().trim().notEmpty();
export const createdAtLoginValidation = body("createdAt").exists().isString().isDate().trim().notEmpty();
export const passwordValidation = body("password").exists().isString().trim().notEmpty().isLength({min: 6, max: 20});
export const loginOremailValidation = body("loginOrEmail").exists().isString().trim().notEmpty();


