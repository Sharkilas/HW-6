import { itemUserVievDBModel } from "./itemModels";

export type LoginInputModel ={
loginOrEmail:	string,
password:	string
};

export type PageUserViewModel= 
{
pagesCount:	number,
page:	number,
pageSize:	number,
totalCount:	number,
items:	[itemUserVievDBModel]
};

export type userInputModel ={
    email:	string,
    login: string,
    password:	string
    };