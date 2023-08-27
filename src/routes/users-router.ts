import express, {Response, Request, Router} from 'express';
import { emailValidation, loginValidation, passwordValidation } from '../Validation/userValidation';
import { httpStatusCodes } from '../http-status-codes/http-status-codes';
import { errorValidationMiddleware } from '../Validation/postValidation';
import { userService } from '../domain/userService';
import { getPaginationFromQueryUsers } from '../Helper/pagination-query.helper';
import { userRepository } from '../repositories/user-repository';
import { authGuardMiddleware } from '../autorization/autorizationmidleware';

export const userRouter = Router ({})  

userRouter.get('/', async (req: Request, res: Response) => {
    const Values = getPaginationFromQueryUsers(req.query)  
    const users = await userRepository.getAllUser(Values)
    res.status(httpStatusCodes.OK_200).send(users)                   
    }),

userRouter.post('/', 
authGuardMiddleware,
loginValidation,
emailValidation,
passwordValidation,
errorValidationMiddleware,
async (req: Request, res: Response) => {
  const newUser =  await userService.createUser(req.body)
  if(!newUser){
  res.sendStatus(httpStatusCodes.UNAUTHORIZED_401)
  }
  else {
    res.status(httpStatusCodes.CREATED_201).send(newUser)
  }
}),

userRouter.delete('/:id', 
authGuardMiddleware,
async  (req: Request, res: Response) => {
    let isDeleted: boolean = await userService.deleteUser(req.params.id);
    if (!isDeleted) {
        res.sendStatus(httpStatusCodes.NOT_FOUND_404)
      } else {
        res.sendStatus(httpStatusCodes.NO_CONTEND_204)
      }
      
    })