import jwt from "jsonwebtoken"
import { ObjectId } from "mongodb";
import { setting } from "../Helper/setting";
import { TUserViewModel } from "../models/itemModels";


export const jwtService = { 
    async createJWT(user: TUserViewModel) {
        const token = jwt.sign({userID: user.id}, setting.JWT_SECRET, {expiresIn: "1h"})
        return  token
        },
    async getUserIdByToken(token: string) {
        try {
            const result: any = jwt.verify(token, setting.JWT_SECRET)
            return result.userId
        } catch (error) {
            return null
        }
            } 
}


 