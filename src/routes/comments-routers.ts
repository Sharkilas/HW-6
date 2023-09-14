import { Router } from "express"
import { httpStatusCodes } from "../http-status-codes/http-status-codes";
import { Request, Response } from "express";
import { errorValidationMiddleware} from "../Validation/postValidation";
import { authGuardMiddleware } from "../autorization/autorizationmidleware";
import { commentsRepositories } from "../repositories/comment-in-db-Rep";

import { commentInputModels } from "../models/commentsModels";
import { commentsServise } from "../domain/comments-servise";
import { contentValidation } from "../Validation/commentValidation";

export const commentsRoute = Router ({})  

commentsRoute.get('/:id', async (req: Request, res: Response) => {
    let foundComments = await commentsRepositories.getCommentId(req.params.id);
    if(foundComments)
   { res.status(httpStatusCodes.OK_200).json(foundComments)
    } else {
        res.status(404)
    };

commentsRoute.put('/commentId', 
authGuardMiddleware,
contentValidation,
errorValidationMiddleware,
async (req: Request, res: Response) => {
    const updateCommentsParams: commentInputModels= {
        id: req.params.id,
        content: req.body.content
    }
const updateComments: boolean = await commentsServise.updateComments(updateCommentsParams)

if (!updateComments) {                                      // реализовать 403	If try edit the comment that is not your own
    
    return res.sendStatus(httpStatusCodes.NOT_FOUND_404)
   }
   res.sendStatus(httpStatusCodes.NO_CONTEND_204)                                      
   return   })
})

commentsRoute.delete('/:commentId',
authGuardMiddleware,
errorValidationMiddleware,
async (req: Request, res: Response) => {
    let isDeleted: boolean = await commentsServise.deleteComments(req.params.id) // нужно реализовать логику (ошибку 403) If try delete the comment that is not your own
    if (!isDeleted) {
        res.sendStatus(httpStatusCodes.NOT_FOUND_404)
      } else {
        res.sendStatus(httpStatusCodes.NO_CONTEND_204)
      }
})

