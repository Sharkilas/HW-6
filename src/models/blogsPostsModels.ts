import { itemBlogDbModel, itemPostDBModel } from "./itemModels";



export type PageBlogViewModel= 
{
pagesCount:	number,
page:	number,
pageSize:	number,
totalCount:	number,
items:	[itemBlogDbModel]
};



export type CreateBlogInputModel =
{
name: string,
description: string,
websiteUrl: string 
};

export type UpdateBlogInputModel = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string,
    createdAt: string,
    isMembership: true
  };
export type BlogInputModel = {
    id: string,
    name: string,
    description: string,
    websiteUrl: string,
    };

export type PagePostViewModel= 
{
pagesCount:	number,
page:	number,
pageSize:	number,
totalCount:	number,
items:	[itemPostDBModel]
};
export type CreatePostInputModel =
{
    title: string,
    shortDescription: string,
    content: string,
    blogId: string               
    }
export type UpdatePostInputModel =
    {
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    blogId: string               
    }
        

export { itemBlogDbModel };
export	{itemPostDBModel};
