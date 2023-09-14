import bodyParser from "body-parser";
import express, { Response, Request, NextFunction } from "express";
import { jwtService } from "../application/jwtService";
import { userService } from "../domain/userService";
import { httpStatusCodes } from "../http-status-codes/http-status-codes";
import { userRepository } from "../repositories/user-repository";

export const authGuardMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    res.sendStatus(httpStatusCodes.UNAUTHORIZED_401);
    return;
  }
  const token = req.headers.authorization.split(" ")[1];
  const userId = await jwtService.getUserIdByToken(token);
  if (!userId) {
    res.sendStatus(401);
    return;
  }
  const user = await userService.findUserById(userId);
  if (!user) {
    res.sendStatus(401);
    return;
  }
  //req.user = user                          -хз надо ли
  next;
};
