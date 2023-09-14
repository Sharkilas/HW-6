import { ObjectId } from "bson";

export type itemPostDBModel=
{
id: string,
title: string,
shortDescription: string,
content: string,
blogId: string,
blogName: string,
createdAt: string
    };

export type itemPostCommentsDBModel=
{
id: string,
content: string,
commentatorInfo: {
    userId: string,
    userLogin: string
  },
createdAt: string
};
    

export type itemUserVievDBModel =
{
    id?:	string,
    login:	string,
    email:	string,
    createdAt:	string,
};

export type itemBlogDbModel= 
{
    id:	string,
    name: string,
    description: string,
    websiteUrl:	string,
    createdAt: string,
    isMembership: boolean
};


export type TUserDbModel = {
    _id: ObjectId
    id:	string
    login:	string
    email:	string
    createdAt:	string
    passwordSalt: string
    passwordHash: string
}

export type TUserViewModel = {
    id:	string
    login:	string
    email:	string
    createdAt:	string
}