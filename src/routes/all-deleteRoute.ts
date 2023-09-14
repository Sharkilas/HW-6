import bodyParser from 'body-parser';
import express, {Response, Request, NextFunction, Router} from 'express';
import { blogsClientCollection, commentsClientCollection, postsClientCollection, userClientCollection } from '../repositories/db';

export const testingRouters = Router({})



testingRouters.delete ('/all-data', 
async (req: Request, res: Response) => {
  await Promise.all([ 
      blogsClientCollection.deleteMany({}),  
      postsClientCollection.deleteMany({}),
      userClientCollection.deleteMany({}),
      commentsClientCollection.deleteMany({})
]) 
  res.sendStatus(204) 
})