import { Filter, ObjectId } from "mongodb";
import { itemUserVievDBModel, TUserDbModel } from "../models/itemModels";
import { PaginationInputUserModel, PaginationOutputModel } from "../models/pagination.model";
import { userClientCollection } from "./db";



export const userRepository = {
    async getAllUser(Values: PaginationInputUserModel): Promise<PaginationOutputModel<itemUserVievDBModel>> {
        
        
        const filter: Filter<TUserDbModel>= {$or: [{email:{$regex: Values.searchEmailTerm, $options: 'i'}}, {login: {$regex: Values.searchLoginTerm, $options: 'i'}}]}
        // if (searchLoginTerm||searchEmailTerm){
        //     filter.$or = []
        //     if (searchLoginTerm){
        //         filter.$or.push({login:new RegExp(Values.searchLoginTerm, "gi")});//filter.$or.push({login: {$regex: searchLoginTerm, $options: "gi")})
        //     }
        //     if (searchEmailTerm)
        //     {
        //         filter.$or.push({email:new RegExp(Values.searchEmailTerm, "gi")}) //filter.$or.push({email: {$regex: searchEmailTerm, $options: "gi")}) 
        //     }
        // }
        
        // ({$or: [{email:{$regex: loginOrEmail ?? '', $options: 'i'}}, {userName: {$regex: loginOrEmail ?? '', $options: 'i'}}]})
        // let filter: any = []   прописать через If   если прилетело то push если прописать if 12 и 13
        // if (Values.searchLoginTerm==={}||Values.searchEmailTerm==={}){

        // };

        // const filter = {$or: []}      
        //   filter.$or.push({login:new RegExp(Values.searchLoginTerm, "gi")});
        //   filter.$or.push({email:new RegExp(Values.searchEmailTerm, "gi")})                                                                               
        const users = await userClientCollection.find(filter, {projection: {_id: 0, passwordHash: 0, passwordSalt:0}})
                                     .sort({[Values.sortBy]: Values.sortDirection})
                                     .skip(Values.skip)
                                     .limit(Values.pageSize)
                                     .toArray()

const totalCount = await userClientCollection.countDocuments(filter)
const pagesCount = Math.ceil(totalCount / Values.pageSize)
return {
pagesCount: pagesCount,
page:	Values.pageNumber,
pageSize:	Values.pageSize,
totalCount: totalCount,
items: users
}


        // у Димыча было в видео ТАк
        // return userClientCollection
        //     .find()
        //     .sort('createdAt', -1)
        //     .toArray()
    },

    async createUser(user: TUserDbModel): Promise<TUserDbModel> {
         await userClientCollection.insertOne(user)
        return user
    },

    async findUserById(id :string):  Promise<itemUserVievDBModel| null> {     
    let founderUser = await userClientCollection.findOne({id: id})
    if (founderUser){
        return {
        id: founderUser.id.toString(),
        login: founderUser.login,
        email: founderUser.email,
        createdAt: founderUser.createdAt}
    } else {
        return null 
    }
    },

    async findByLoginOrEmail(loginOrEmail: string): Promise<TUserDbModel | null>{
        return userClientCollection.findOne({$or: [{email:{$regex: loginOrEmail ?? '', $options: 'i'}}, {login: {$regex: loginOrEmail ?? '', $options: 'i'}}]})
    },
    
    async deleteUser(id: string):  Promise <boolean> {
        const result = await userClientCollection.deleteOne ({id: id}) 
        return  result.deletedCount === 1
      },  




}