
import { commentsClientCollection } from "./db";
import { commentDbModel, commentInputModels } from "../models/commentsModels";
import { PaginationInputCommentModel, PaginationOutputModel } from "../models/pagination.model";


export const commentsRepositories ={
    async getCommentId(id:string): Promise<commentDbModel| null> {
    return await commentsClientCollection.findOne({id}, {projection: {_id: 0}})
    },

    async updateComments({id, content}: commentInputModels): Promise <boolean> {
    const result = await commentsClientCollection.updateOne({id: id}, {$set: {content: content}})
    return result.modifiedCount === 1     
    },

    async deleteComment(id: string): Promise <boolean> {
    const result = await commentsClientCollection.deleteOne({id: id})
    return result.deletedCount === 1   
    },
    async getPosts(Values: PaginationInputCommentModel): Promise<PaginationOutputModel<commentDbModel>> {
        const filter = {}
        console.log(Values);
            const posts = await commentsClientCollection.find(filter, {projection: {_id: 0}})
                                                .sort({[Values.sortBy]: Values.sortDirection})
                                                .skip(Values.skip)
                                                .limit(Values.pageSize) 
                                                .toArray()
    
        const totalCount = await commentsClientCollection.countDocuments(filter)
        const pagesCount = Math.ceil(totalCount / Values.pageSize)
        return {
          pagesCount,
          page:	Values.pageNumber,           
          pageSize:	Values.pageSize,
          totalCount,
          items: posts
        }
      }, 

}