import instance from "../utils/request";

export function searchPage(searchParams){
    return instance.get(`menu`,{params:searchParams})
}