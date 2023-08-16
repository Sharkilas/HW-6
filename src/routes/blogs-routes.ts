import { Router } from "express"
import { errorsMessages, httpStatusCodes } from "../http-status-codes/http-status-codes";

import { Request, Response } from "express";
import {body, validationResult} from "express-validator";
import {descriptionBlogValidation, nameBlogValidation, websiteBlogUrlValidation} from "../Validation/blogValidation"; //
import { errorValidationMiddleware } from "../Validation/postValidation";
import { authGuardMiddleware } from "../autorization/autorizationmidleware";
import { currentDate } from "../Helper/Helper";
import { UpdateBlogInputModel } from "../models/blogsPostsModels";
import { blogsService } from "../domain/blogs-servise";
import { blogsRepositories } from "../repositories/Blog-in-db-Rep";
import { getPaginationFromQuery } from "../Helper/pagination-query.helper";



export const blogsRoute = Router ({})  

// get => query repo
// create / update / detele => service + repo


blogsRoute.get('/', async (req: Request, res: Response) => {
      const Values = getPaginationFromQuery(req.query)
      //console.log(pagination);
      
      const blogs = await blogsRepositories.getBlogs(Values)
      res.status(httpStatusCodes.OK_200).send(blogs)
 })

blogsRoute.get('/:id', async (req: Request, res: Response) => {
    let foundBlogs = await blogsRepositories.getBlogById(req.params.id);
    if (foundBlogs) {
        res.status(httpStatusCodes.OK_200).json(foundBlogs)   
      } else {
        res.sendStatus(404)
      }
      
    })
                                                             //const foundBlogs = blogsRepositories.findBlog(req.query.name?.toISOString());
blogsRoute.get('/:blogId/posts', async (req: Request, res: Response) => {
  const Values = getPaginationFromQuery(req.query)  
  
  let foundblogId = await blogsRepositories.getBlogsIdPosts(Values, req.params.blogId);                 // хз что надо передавать
    if (foundblogId) {
        res.status(httpStatusCodes.OK_200).json(foundblogId)   
      } else {
        res.sendStatus(404)
      }
      
    })

blogsRoute.post('/', 
authGuardMiddleware,
websiteBlogUrlValidation,
nameBlogValidation,
descriptionBlogValidation,
errorValidationMiddleware,
async (req: Request, res: Response) => {
  const name = req.body.name
  const description = req.body.description
  const websiteUrl = req.body.websiteUrl
  const createdBlog = await blogsService.createBlog({name, description, websiteUrl})
    res.status(httpStatusCodes.CREATED_201).send(createdBlog)
})

blogsRoute.post('/:blogId/posts', 
authGuardMiddleware,
websiteBlogUrlValidation,
nameBlogValidation,
descriptionBlogValidation,
errorValidationMiddleware,
async (req: Request, res: Response) => {
  const title = req.body.title
  const shortDescription = req.body.shortDescription
  const content = req.body.content
  const blogId = req.body.blogId
  const createdBlog = await blogsService.createBlogIdPosts({title, shortDescription, content, blogId})
    res.status(httpStatusCodes.CREATED_201).send(createdBlog)
})
      
    
blogsRoute.put('/:id', 
authGuardMiddleware,
websiteBlogUrlValidation,
nameBlogValidation,
descriptionBlogValidation,
errorValidationMiddleware,
async (req: Request, res: Response) => {
  const updateBlogModel: UpdateBlogInputModel = {
    id: req.params.id,
    name: req.body.name,
    description: req.body.description,
    websiteUrl: req.body.websiteUrl,
    createdAt: currentDate.toISOString(),
    isMembership: true
  }
  const updatedBlogs: Boolean = await blogsService.updateBlog(updateBlogModel) 
    
  if (!updatedBlogs) {
   return res.sendStatus(httpStatusCodes.NOT_FOUND_404)
  }
  res.sendStatus(httpStatusCodes.NO_CONTEND_204)                                      
  return   })

  blogsRoute.delete('/:id', 
  authGuardMiddleware,
  async (req: Request, res: Response) => {
    let isDeleted: boolean = await blogsService.deleteBlog(req.params.id);
    if (!isDeleted) {
        res.sendStatus(httpStatusCodes.NOT_FOUND_404)
      } else {
        res.sendStatus(httpStatusCodes.NO_CONTEND_204)
      }
      
    })


