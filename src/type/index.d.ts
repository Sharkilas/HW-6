import { userInputModel } from "../models/loginModels";
import { Request, Response } from "express";

declare global {
    namespace Express {
        export interface Request {
            user: userInputModel | null
        }
    }
}