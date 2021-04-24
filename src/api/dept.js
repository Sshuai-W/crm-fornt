import instance from '../utils/request';

export function searchPage(searchParams){
    return instance.get(`dept`,{params:searchParams})
}

export function getChildren(id){
    return instance.get(`dept/${id}/findChildren`)
}

export function addDept(formData){
    return instance.post(`dept`,formData)
}

export function updateDept(formData){
    return instance.put(`dept`,formData)
}

export function deleteById(id){
    return instance.delete(`dept/${id}`)
}