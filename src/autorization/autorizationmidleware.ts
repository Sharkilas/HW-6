import bodyParser from 'body-parser';
import express, {Response, Request, NextFunction} from 'express';
import { httpStatusCodes } from '../http-status-codes/http-status-codes';





export const authGuardMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization
  if(!auth) return res.sendStatus(httpStatusCodes.UNAUTHORIZED_401)
  const [type, value] = auth.split(' ')
  if( type !== 'Basic') return res.sendStatus(401)
  if(value !==  'YWRtaW46cXdlcnR5') return res.sendStatus(401)
  return next()
  // const code = Buffer.from("admin:qwerty").toString('base64')  
  // if (req.headers.authorization === `Basic ${code}`) {
  //     next();
  // }else 
  // {
  //     res.sendStatus(httpStatusCodes.UNAUTHORIZED_401)
  // }
}
