import { randomUUID } from "crypto"
import { currentDate } from "../Helper/Helper"
import { CreateBlogInputModel, CreatePostInputModel, itemBlogDbModel, UpdateBlogInputModel } from "../models/blogsPostsModels"
import { itemPostDBModel } from "../models/itemModels"
import { PaginationInputModel, PaginationOutputModel } from "../models/pagination.model"
import { blogsRepositories } from "../repositories/Blog-in-db-Rep" 
import { blogsClientCollection, postsClientCollection } from "../repositories/db"
import { commentInputModels } from "../models/commentsModels"
import { commentsRepositories } from "../repositories/comment-in-db-Rep"


export const commentsServise = {
async updateComments ({id, content}: commentInputModels): Promise <boolean> {          
    return await commentsRepositories.updateComments({id, content})},

async deleteComments(id: string): Promise <boolean> {
    return await commentsRepositories.deleteComment(id)
} 
}