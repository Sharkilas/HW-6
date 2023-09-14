import {body, validationResult} from "express-validator";
import { Request, Response, NextFunction, query} from "express";


export const contentValidation = body("content").exists().isString().trim().notEmpty().isLength({min: 20, max: 300});
export const createdAtcontentValidation = body("createdAt").exists().isString().isDate().trim().notEmpty();


