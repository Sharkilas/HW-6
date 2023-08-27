import express, {Response, Request, Router} from 'express';
import { emailValidation, loginValidation, passwordValidation } from '../Validation/userValidation';
import { httpStatusCodes } from '../http-status-codes/http-status-codes';
import { errorValidationMiddleware } from '../Validation/postValidation';
import { userService } from '../domain/userService';

export const userAuthRouter = Router ({})  

userAuthRouter.post('/login', 

async (req: Request, res: Response) => {
  const loginUser =  await userService.checkCredentials(req.body.loginOrEmail, req.body.password) //(req.body.login || req.body.email, req.body.password)
  if (loginUser) 
  {const newUser =  await userService.createUser(req.body)
    res.status(httpStatusCodes.CREATED_201).send(newUser)
  }
  else {
  res.status(httpStatusCodes.UNAUTHORIZED_401).send(loginUser)}
})

