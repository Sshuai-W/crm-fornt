import instance from "../utils/request"

export function searchPage(searchParams){
    return instance.get(`role`,{params:searchParams})
}