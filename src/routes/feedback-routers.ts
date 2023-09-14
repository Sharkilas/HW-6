import { Router } from "express"
import { authGuardMiddleware } from "../autorization/autorizationmidleware"
import { Request, Response } from "express";
import { httpStatusCodes } from "../http-status-codes/http-status-codes";

export const feedbackRouter = Router ({})

// feedbackRouter 
// .post('/',
// authGuardMiddleware,
//     async (req: Request, res: Response) =>  {
//         const newProduct = await feedBackService.sendFeedback(req.body.comment, req.user!._id)
//         res.status(httpStatusCodes.CREATED_201).send(newProduct)
//     })
// .get('/', async (req, res) => {
//     const users =await feedBackService.allFeedbackService()
//     res.send(users)
// })