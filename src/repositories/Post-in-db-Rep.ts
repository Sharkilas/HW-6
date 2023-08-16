import { Request, Response } from "express";
import { currentDate, getRandomId } from "../Helper/Helper";
import { blogsClientCollection, client, db, postsClientCollection } from "./db";
import { randomUUID } from "crypto";
import { MongoClient } from 'mongodb'
import { title } from "process";
import { CreatePostInputModel, itemPostDBModel, UpdatePostInputModel } from "../models/blogsPostsModels";
import { PaginationInputModel, PaginationOutputModel } from "../models/pagination.model";


export const postsRepositories = {
  
  async getPosts(Values: PaginationInputModel): Promise<PaginationOutputModel<itemPostDBModel>> {
    const filter: any = {}                                                                          // хз правильно?
    if (Values.searchNameTerm)
    {filter.searchNameTerm= {$regex: Values.searchNameTerm}                            
    }
    const posts = await postsClientCollection.find(filter, {projection: {_id: 0}})
                                            .sort({[Values.sortBy]: Values.sortDirection})
                                            .skip(Values.skip)
                                            .limit(Values.pageSize)
                                            .toArray()

    const totalCount = await postsClientCollection.countDocuments(filter)
    const pagesCount = Math.ceil(totalCount / Values.pageSize)
    return {
      pagesCount,
      page:	Values.pageNumber,
      pageSize:	Values.pageSize,
      totalCount,
      items: posts
    }
  }, 
 
  async getPostsId(id: string ): Promise<itemPostDBModel| null>  {
    const filter: any = {}                       
     if (id)
     {filter.id= {$regex: id}                           
     }
     return await postsClientCollection.findOne(filter, {projection: {_id: 0}})
  },

  async createPosts({title, shortDescription, content, blogId}: CreatePostInputModel): Promise <itemPostDBModel | null> {       
  const blog =  await blogsClientCollection.findOne({id: blogId})  
  if(!blog) return null      
    const newPost: itemPostDBModel = {
    id: randomUUID(),
    title: title,
    shortDescription: shortDescription,
    content: content,
    blogId: blogId,
    blogName: blog.name,
    createdAt: currentDate.toISOString(),
  } 
  await postsClientCollection.insertOne({...newPost})
  return newPost  
 },
 async updatePost({id, shortDescription, content, title, blogId}: UpdatePostInputModel): Promise <boolean> {                  
  const result = await postsClientCollection.updateOne({id: id}, {$set: {title: title, shortDescription: shortDescription, content: content, blogId: blogId}})
  return result.modifiedCount === 1
 },
 
 async deletePost(id: string):  Promise <boolean> {
  const result = await postsClientCollection.deleteOne ({id: id}) 
  return  result.deletedCount === 1
},
async deleteAllPost() {
  await postsClientCollection.deleteMany({})
  return true
} 
}