
import { Request, Response } from "express";
import { currentDate, getRandomId } from "../Helper/Helper";
import { blogsClientCollection, client, db, postsClientCollection } from "./db";
import { randomUUID } from "crypto";
import { CreateBlogInputModel, itemBlogDbModel, CreatePostInputModel, PageBlogViewModel, UpdateBlogInputModel} from "../models/blogsPostsModels";
import { PaginationInputModel, PaginationOutputModel } from "../models/pagination.model";
import { Filter } from "mongodb";
import { itemPostDBModel } from "../models/itemModels";

  
  export const blogsRepositories = {
    async getBlogs(Values: PaginationInputModel): Promise<PaginationOutputModel<itemBlogDbModel>> {
      const filter: Filter<itemBlogDbModel> = {name: {$regex: Values.searchNameTerm ?? '', $options: 'i'} }          

      const blogs = await blogsClientCollection.find(filter, {projection: {_id: 0}})
                                              .sort({[Values.sortBy]: Values.sortDirection})
                                              .skip(Values.skip)
                                              .limit(Values.pageSize)
                                              .toArray()

      const totalCount = await blogsClientCollection.countDocuments(filter)
      const pagesCount = Math.ceil(totalCount / Values.pageSize)

      return {
        pagesCount,
        page:	Values.pageNumber,
        pageSize:	Values.pageSize,
        totalCount,
        items: blogs
      }
      // const totalPage: number =   Math.ceil(await blogsClientCollection.countDocuments({})/pageSize)                // или  просто передать totalCount общее кол-во стр 
      // return blogsClientCollection.find({}, {projection: {_id: 0}}).skip(skipBlogs).limit(pageSize||10).toArray()         // .limit ($or :[{pageSize}, {10}]) -                            //скип - пропустить, лимит сколько взять
    },
  async getBlogById(id: string): Promise<itemBlogDbModel| null> { 
    
    return await blogsClientCollection.findOne({id}, {projection: {_id: 0}})
     },
  async getBlogsIdPosts(Values: PaginationInputModel, blogId: string): Promise<PaginationOutputModel<itemPostDBModel>> {
      const blogidPosts = await postsClientCollection
      .find({blogId: blogId}, {projection: {_id: 0}})
      .sort({[Values.sortBy]: Values.sortDirection})
      .skip(Values.skip)
      .limit(Values.pageSize)
      .toArray()
      
      const totalCount = await postsClientCollection.countDocuments({blogId: blogId})
      const pagesCount = Math.ceil(totalCount / Values.pageSize)

      return {
        pagesCount,
        page:	Values.pageNumber,
        pageSize:	Values.pageSize,
        totalCount,
        items: blogidPosts
      }
      // const totalPage: number =   Math.ceil(await blogsClientCollection.countDocuments({})/pageSize)                // или  просто передать totalCount общее кол-во стр 
      // return blogsClientCollection.find({}, {projection: {_id: 0}}).skip(skipBlogs).limit(pageSize||10).toArray()         // .limit ($or :[{pageSize}, {10}]) -                            //скип - пропустить, лимит сколько взять
    }, 



async updateBlog({id, name, description, websiteUrl}: UpdateBlogInputModel): Promise <boolean> {
    const result = await blogsClientCollection.updateOne({id: id}, {$set: {name: name, description: description, websiteUrl: websiteUrl}})
      return result.modifiedCount === 1
     },

 

  async createBlog(newBlog: itemBlogDbModel): Promise <itemBlogDbModel> {                   
  
   await blogsClientCollection.insertOne(newBlog);
   return newBlog   

}, 

async createBlogIdPosts({title, shortDescription, content, blogId}: CreatePostInputModel): Promise <itemPostDBModel | null> {        // пришлось прописывать типы (res: Response, req: Request) по другому выдавал ошибку
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






  async deleteBlog(id: string): Promise <boolean> {
  const result = await blogsClientCollection.deleteOne({id: id}) 
  return  result.deletedCount === 1
  },
 
  async deleteAllBlogs() {
    await blogsClientCollection.deleteMany({})
    return true
  } 
}
