import { ObjectId } from "mongodb";
import { itemUserVievDBModel } from "../models/itemModels";
import { LoginInputModel, userInputModel } from "../models/loginModels";
import bcrypt from 'bcrypt'
import { randomUUID } from "crypto";
import { userRepository } from "../repositories/user-repository";


export const userService = {
    
    async createUser({login, password, email}: userInputModel): Promise<itemUserVievDBModel>
    {
        const passwordSalt = await bcrypt.genSalt(12);
        const passwordHash = await this.generateHash(password, passwordSalt);

        const newUser: any  = {
            id: randomUUID(),
            login: login,
            passwordHash,
            passwordSalt,
            email:	email,
            createdAt:	new Date().toISOString() 
        }
        return userRepository.createUser(newUser)
    },

    async findUserById(id:string):  Promise<itemUserVievDBModel | null>{
        return userRepository.findUserById(id)
    },
        
    async checkCredentials(loginOrEmail: string, password: string): Promise<boolean>{
       
        const user= await userRepository.findByLoginOrEmail(loginOrEmail)
        
         if(!user) return false
         
         const passwordHash = await this.generateHash(password, user.passwordSalt);
         if(user.passwordHash!==passwordHash) {
            return false
         }
        return true
    },
    
    async generateHash(password: string, salt: string) {
        const hash = await bcrypt.hash(password, salt)
        return hash
    },

    async deleteUser(id: string):  Promise <boolean> {
        return await userRepository.deleteUser(id) 
        } 


}