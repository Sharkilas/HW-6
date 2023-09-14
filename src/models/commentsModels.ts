export type commentInputModels= {
    id: string,
    content: string
};

export type commentDbModel=
{
 id: string,
 content: string,
 commentatorInfo: {
 userId: string,
 userLogin: string
  },
  createdAt: string
    
}

