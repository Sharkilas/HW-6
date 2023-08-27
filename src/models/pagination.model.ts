// export interface DefaultPaginationInputModel  {
//     sortBy: string,
//     sortDirection: 'asc' | 'desc',
//     pageNumber:	number,
//     pageSize: number,
//     skip(): number
// }

//import { type } from "os";

// export interface BlogsPaginationInputModel extends DefaultPaginationInputModel {
//     searchNameTerm: string,
// }

// export interface UsersPaginationInputModel extends DefaultPaginationInputModel {
//     searchLoginTerm: string,
//     searchEmailTerm: string,
// }

export interface PaginationInputModel  {
    searchNameTerm: string,
    sortBy: string,
    sortDirection: 'asc' | 'desc',
    pageNumber:	number,
    pageSize: number,
    skip: number
}

export interface PaginationInputUserModel  {
     searchLoginTerm: string,
     searchEmailTerm: string,
     sortBy: string,
     sortDirection: 'asc' | 'desc',
     pageNumber:	number,
     pageSize: number,
     skip: number
}





export type PaginationOutputModel<T>= {
    pagesCount:	number,
    page:	number,
    pageSize:	number,
    totalCount:	number,
    items: T[]
};

