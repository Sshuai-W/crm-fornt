import instance from "../utils/request";

export function searchPage(searchParams){
    return instance.get(`admin`,{params:searchParams})
}
export function deleteAllPick(ids){
    return instance.delete(`admin/pick/${ids}`)
}

export function deleteById(id){
    return instance.delete(`admin/${id}`)
}

export function searchAllDept(){
    return instance.get(`dept/tree`)
}

export function findAreaChildren(id){
    return instance.get(`area/${id}/children`)
}

export function add(formData){
    return instance.post(`admin`,formData)
}

export function update(formData){
    return instance.put(`admin`,formData)
}