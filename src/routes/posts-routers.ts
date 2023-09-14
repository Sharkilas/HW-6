import { Router } from "express";
import { Request, Response } from "express";
import { errorsMessages, httpStatusCodes } from "../http-status-codes/http-status-codes";

import { blogIdPostValidation, contentPostValidation, errorValidationMiddleware,  shortDescriptionPostValidation, titlePostValidation } from "../Validation/postValidation";
import {body, validationResult} from "express-validator";

import { authGuardMiddleware } from "../autorization/autorizationmidleware";
import { UpdatePostInputModel } from "../models/blogsPostsModels";
import { postsServise } from "../domain/posts-service";
import { getPaginationFromQuery, getPaginationFromQueryComments } from "../Helper/pagination-query.helper";
import { postsRepositories } from "../repositories/Post-in-db-Rep";
import { commentsRepositories } from "../repositories/comment-in-db-Rep";


export const postsRoute = Router ({})  


postsRoute.get('/:postId/comments', async (req: Request, res: Response) => {
  const postId = req.params.postId
  const post = await postsRepositories.getPostsId(postId)
  
  if(!post) return res.sendStatus(404)
  const Values = getPaginationFromQueryComments(req.query)   // или тут нужно пагинацию делать постов
  const foundPostId = await postsRepositories.getPostsIdComments(Values, postId);              
  return res.status(httpStatusCodes.OK_200).json(foundPostId)   
  })
  

postsRoute.get('/', async (req: Request, res: Response) => {
  const Values = getPaginationFromQuery(req.query)  
  const posts = await postsRepositories.getPosts(Values)
  res.status(httpStatusCodes.OK_200).send(posts)                   
  })
  
postsRoute.get('/:id', async (req: Request, res: Response) => {
  let foundPost = await postsRepositories.getPostsId(req.params.id);
  if (foundPost) {
    res.status(httpStatusCodes.OK_200).json(foundPost)    
      } else {
        res.sendStatus(404)
      }
  })
postsRoute.post('/', 
  authGuardMiddleware,
  titlePostValidation,
  shortDescriptionPostValidation,
  contentPostValidation,
  blogIdPostValidation,
  errorValidationMiddleware,                  
async  (req: Request, res: Response) => { 
 const title = req.body.title
 const shortDescription = req.body.shortDescription
 const content = req.body.content
 const blogId = req.body.blogId

const createdPost = await postsServise.createPosts({title, shortDescription, content, blogId})
  res.status(httpStatusCodes.CREATED_201).send(createdPost)
})
   
    
  
postsRoute.put('/:id', 
  authGuardMiddleware,
  titlePostValidation,
  shortDescriptionPostValidation,
  contentPostValidation,
  blogIdPostValidation,
  errorValidationMiddleware, 
  async (req: Request, res: Response) => { 
  const updatedPostModel: UpdatePostInputModel = {   
  id: req.params.id,
  title: req.body.title,
  shortDescription: req.body.shortDescription,
  content: req.body.content,
  blogId: req.body.blogId
   } 
   const updatedPost: Boolean = await postsServise.updatePost(updatedPostModel)  
  if (!updatedPost) {
   return res.sendStatus(httpStatusCodes.NOT_FOUND_404)
  }
  res.sendStatus(httpStatusCodes.NO_CONTEND_204)                                      
  return   })

postsRoute.delete('/:id', 
authGuardMiddleware,
async  (req: Request, res: Response) => {
    let isDeleted: boolean = await postsServise.deletePost(req.params.id);
    if (!isDeleted) {
        res.sendStatus(httpStatusCodes.NOT_FOUND_404)
      } else {
        res.sendStatus(httpStatusCodes.NO_CONTEND_204)
      }
      
    })
  