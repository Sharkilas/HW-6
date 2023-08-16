import {body, validationResult} from "express-validator";
import { Request, Response, NextFunction, query} from "express";


export const idBlogValidation = body("id").exists().isString().trim().notEmpty();
export const nameBlogValidation = body("name").exists().isString().trim().notEmpty().isLength({max: 15});
export const descriptionBlogValidation = body("description").exists().isString().trim().notEmpty().isLength({max: 500});
export const websiteBlogUrlValidation = body("websiteUrl").exists().isString().isURL().trim().notEmpty().isLength({max: 100})
export const createdAtBlogValidation = body("createdAt").exists().isString().isDate().trim().notEmpty()
export const isembershipBlogValidation = body("isMembership").exists().isBoolean().notEmpty()





//проверить в свагере 