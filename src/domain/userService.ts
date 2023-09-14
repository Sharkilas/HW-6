import { ObjectId } from "mongodb";
import { itemUserVievDBModel, TUserDbModel, TUserViewModel } from "../models/itemModels";
import { LoginInputModel, userInputModel } from "../models/loginModels";
import bcrypt from 'bcrypt'
import { randomUUID } from "crypto";
import { userRepository } from "../repositories/user-repository";


export const userService = {
    
    async createUser({login, password, email}: userInputModel): Promise<TUserViewModel>
    {
        const passwordSalt = await bcrypt.genSalt(12);
        const passwordHash = await this.generateHash(password, passwordSalt);

        const newUser: TUserDbModel  = {
            _id: new ObjectId(),
            id: randomUUID(),
            login: login,
            passwordHash,
            passwordSalt,
            email:	email,
            createdAt:	new Date().toISOString() 
        }
        await userRepository.createUser(newUser)
        return {
            id: newUser.id,
            login: newUser.login,
            email: newUser.email,
            createdAt: newUser.createdAt
        }
    },

    async findUserById(id:string):  Promise<itemUserVievDBModel | null>{
        return userRepository.findUserById(id)
    },
        
    async checkCredentials(loginOrEmail: string, password: string)  {
       
        const user= await userRepository.findByLoginOrEmail(loginOrEmail)
        
         if(!user) return false
        console.log(user);
        
        //  const passwordHash = await this.generateHash(password, user.passwordSalt);
        const res = await bcrypt.compare(password, user.passwordHash)
        console.log(res);
        return user
        //  return user.passwordHash === passwordHash
        //  if(user.passwordHash!==passwordHash) {
        //     return false
        //  }
        // return true
    },
    
    async generateHash(password: string, salt: string) {
        const hash = await bcrypt.hash(password, salt)
        return hash
    },

    async deleteUser(id: string):  Promise <boolean> {
        return await userRepository.deleteUser(id) 
        } 


}