import instance from "../utils/request"

export function findAll(){
    return instance.get(`category`)
}
export function deleteByEntity(deleteCategory){
    return instance.post(`category/delete`,deleteCategory)
}