import express, { Response, Request, Router } from "express";
import {
  emailValidation,
  loginOremailValidation,
  loginValidation,
  passwordValidation,
} from "../Validation/userValidation";
import { httpStatusCodes } from "../http-status-codes/http-status-codes";
import { errorValidationMiddleware } from "../Validation/postValidation";
import { userService } from "../domain/userService";
import { jwtService } from "../application/jwtService";
import { userRepository } from "../repositories/user-repository";
import { authGuardMiddleware } from "../autorization/autorizationmidleware";
import { userInputModel } from "../models/loginModels";
import { itemUserVievDBModel } from "../models/itemModels";

export const userAuthRouter = Router({});

userAuthRouter.post(
  "/login",
  loginOremailValidation,
  passwordValidation,
  errorValidationMiddleware,

  async (req: Request, res: Response) => {
    const loginUser = await userService.checkCredentials(
      req.body.loginOrEmail,
      req.body.password
    );
    const user = await userRepository.findByLoginOrEmail(req.body.loginOrEmail);
    if (loginUser) {
      const token = await jwtService.createJWT(loginUser);
      res.status(200).send({ accessToken: token });
    } else {
      res.sendStatus(401);
    }
  }
);

userAuthRouter.get(
  "/me",
  authGuardMiddleware,
  errorValidationMiddleware,
  async (req: Request, res: Response) => {
    const myValues: itemUserVievDBModel = {
      email: req.user!.email,
      login: req.user!.login,
     // id: req.user!.id,
      createdAt: Date.now().toString(),
    };

    // id:	string,
    // login:	string,
    // email:	string,
    // createdAt:	string,
    res.status(200).send(myValues);
  }
);
