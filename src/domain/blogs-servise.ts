
import { randomUUID } from "crypto"
import { currentDate } from "../Helper/Helper"
import { CreateBlogInputModel, CreatePostInputModel, itemBlogDbModel, UpdateBlogInputModel } from "../models/blogsPostsModels"
import { itemPostDBModel } from "../models/itemModels"
import { PaginationInputModel, PaginationOutputModel } from "../models/pagination.model"
import { blogsRepositories } from "../repositories/Blog-in-db-Rep" 
import { blogsClientCollection, postsClientCollection } from "../repositories/db"




  export const blogsService = {
  // async getBlogs(pagination: PaginationInputModel): Promise<PaginationOutputModel<itemBlogDbModel>> {  
  //  return blogsRepositories.getBlogs(pagination)
  // },
  // async getBlogById(id: string): Promise<itemBlogDbModel| null> { 
    
  //   return await blogsRepositories.getBlogById(id)
  //    },

     async updateBlog({id, name, description, websiteUrl, createdAt, isMembership}: UpdateBlogInputModel): Promise <boolean> {
    return await blogsRepositories.updateBlog({id, name, description, websiteUrl, createdAt, isMembership})
       
     },
  async createBlog({name, description, websiteUrl}: CreateBlogInputModel): Promise <itemBlogDbModel> {                   
    const newBlog: itemBlogDbModel = {         
      id:	randomUUID(),                     
      name:	name,
      description:	description,
      websiteUrl: websiteUrl,
      createdAt: new Date().toISOString(),
      isMembership: false
  }
  await blogsRepositories.createBlog({...newBlog})
  return newBlog   

}, 
async createBlogIdPosts({title, shortDescription, content, blogId}: CreatePostInputModel): Promise <itemPostDBModel | null> {       
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
  const createdBlogIdPostService = await blogsRepositories.createBlogIdPosts({...newPost})
  return createdBlogIdPostService   
 },


  async deleteBlog(id: string): Promise <boolean> {
    return await blogsRepositories.deleteBlog(id) 
    }
 
  
}
