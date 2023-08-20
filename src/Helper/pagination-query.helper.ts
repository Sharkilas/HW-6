import { PaginationInputModel } from "../models/pagination.model";



export const getPaginationFromQuery = (query: any): PaginationInputModel => {
    const defaultValues: PaginationInputModel = {
        searchNameTerm: '',
        sortBy: 'createdAt',
        sortDirection: 'desc',
        pageNumber:	1,
        pageSize: 10,
        skip: 0
    }

    if(query.searchNameTerm) {
        defaultValues.searchNameTerm = query.searchNameTerm
    }

    if(query.sortBy) {
        defaultValues.sortBy = query.sortBy
    }


    if(query.sortDirection && query.sortDirection === 'asc') {
        defaultValues.sortDirection = query.sortDirection
    }


    if(query.pageNumber && !isNaN(parseInt(query.pageNumber, 10)) && parseInt(query.pageNumber, 10) > 0) {
        defaultValues.pageNumber = parseInt(query.pageNumber, 10)
    }

    if(query.pageSize && !isNaN(parseInt(query.pageSize, 10)) && parseInt(query.pageSize, 10) > 0) {
        defaultValues.pageSize = parseInt(query.pageSize, 10)
    }



    defaultValues.skip = (defaultValues.pageNumber - 1) * defaultValues.pageSize

    return defaultValues
}