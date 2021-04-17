import instance from "../utils/request";

export function searchPage(searchParams){
    return instance.get(`brand`,{params:searchParams})
}
export function deleteById(id){
    return instance.delete(`brand/${id}`)
}

export function addEntity(formData){
    return instance.post(`brand`,formData)
}
export function updateEntity(formData){
    return instance.put(`brand`,formData)
}
export function deleteAllPick(ids){
    return instance.delete(`brand/pick/${ids}`)
}