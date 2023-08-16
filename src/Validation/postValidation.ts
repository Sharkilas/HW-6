import {body, FieldValidationError, ValidationError, validationResult} from "express-validator";
import { httpStatusCodes } from "../http-status-codes/http-status-codes";
import { Request, Response, NextFunction} from "express";
import { blogsClientCollection, db } from "../repositories/db";

// export const idPostValidation = body("id").exists().isString().trim().notEmpty(); 
export const titlePostValidation = body("title").exists().isString().trim().notEmpty().isLength({max:30});
export const shortDescriptionPostValidation = body("shortDescription").exists().isString().trim().notEmpty().isLength({max:100});
export const contentPostValidation = body("content").exists().isString().trim().notEmpty().isLength({max:1000});
export const blogIdPostValidation = body("blogId").exists().isString().trim().notEmpty().custom(async (blogId) => {
  const existingBlog = await blogsClientCollection.findOne({id: blogId});
  if(!existingBlog) throw new Error()   // throw прочитать
  return true                                                                       
});
// export const blogNamePostValidation = body("blogName").isString().trim().notEmpty().isLength({max: 15});
// export const createdAtPostValidation = body("createdAt").exists().isString().isDate().trim().notEmpty()








export const errorValidationMiddleware = (req: Request, res: Response, next:NextFunction) => {           
    const errors = validationResult(req).formatWith((error: any) =>({
          message: error.msg,
          field: error.path
    }))
 
    if(!errors.isEmpty()){
      const errArr = errors.array({onlyFirstError: true})

       res.status(httpStatusCodes.BAD_REQUEST_400).json({errorsMessages: errArr})       //2ss 
    }
    else 
    {
       next()
    }
  }
    


  