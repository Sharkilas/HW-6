import express, {Response, Request, Router} from 'express';
import { emailValidation, loginValidation, passwordValidation } from '../Validation/userValidation';
import { httpStatusCodes } from '../http-status-codes/http-status-codes';
import { errorValidationMiddleware } from '../Validation/postValidation';
import { userService } from '../domain/userService';

export const loginAuthRouter = Router ({})  

loginAuthRouter.post('/', 
loginValidation,
emailValidation,
passwordValidation,
errorValidationMiddleware,
async (req: Request, res: Response) => {
  const checkResult =  await userService.checkCredentials(req.body.loginOrEmail, req.body.password)
  res.send(checkResult)
})