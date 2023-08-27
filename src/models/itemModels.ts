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

export type itemUserVievDBModel =
{
    id:	string,
    login:	string,
    email:	string,
    createdAt:	string 
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