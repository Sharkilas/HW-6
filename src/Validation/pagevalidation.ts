import {body, validationResult} from "express-validator";
import { Request, Response, NextFunction, query} from "express";


export const searchNameTermValidation = body("searchNameTerm").exists().isString().trim().notEmpty();
export const sortByValidationValidation = body("sortBy").exists().isString().trim().notEmpty();
export const sortDirectionValidation = body("sortDirection").exists().isString().trim().notEmpty();
export const pageNumberValidation = body("searchNameTerm").isInt().isString().trim().notEmpty();
export const pageSizeValidation = body("pageSize").isInt().isString().trim().notEmpty();


export const pagesCountValidation = body("pagesCount").isInt().isString().trim().notEmpty();
export const pageValidation = body("page").isInt().isString().trim().notEmpty();
export const totalCountValidation = body("totalCount").isInt().isString().trim().notEmpty();