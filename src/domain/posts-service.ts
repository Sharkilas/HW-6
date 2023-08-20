import { randomUUID } from "crypto"
import { currentDate } from "../Helper/Helper"
import { CreatePostInputModel, itemPostDBModel, UpdatePostInputModel } from "../models/blogsPostsModels"
import { blogsClientCollection, postsClientCollection } from "../repositories/db"
import { postsRepositories } from "../repositories/Post-in-db-Rep"



export const postsServise = {
  // async getPosts() {
  //   return await postsRepositories.getPosts()
  // }, 
  // async getPostsId(id: string ): Promise<itemPostDBModel| null>  {
  //   const filter: any = {}                       
  //    if (id)
  //    {filter.id= {$regex: id}                            
  //    }
  //    return await postsRepositories.getPostsId(id)
     
  // },
  async createPosts({title, shortDescription, content, blogId}: CreatePostInputModel): Promise <itemPostDBModel | null> {        // пришлось прописывать типы (res: Response, req: Request) по другому выдавал ошибку
  const blog =  await blogsClientCollection.findOne({id: blogId})  
  if(!blog) return null      
  const newPost: itemPostDBModel = {
    id: randomUUID(),
    title: title,
    shortDescription: shortDescription,
    content: content,
    blogId: blogId,
    blogName: blog.name,
    createdAt: new Date().toISOString(),
  } 
  const createdPostsService = await postsRepositories.createPosts({...newPost})
  return createdPostsService  
 },
 async updatePost({id, shortDescription, content, title, blogId}: UpdatePostInputModel): Promise <boolean> {                  
  return await postsRepositories.updatePost({id, title, shortDescription, content, blogId})
  },
 
 async deletePost(id: string):  Promise <boolean> {
  return await postsRepositories.deletePost(id) 
  }
}