import axiosExport from "../../Service/HttpService"
import ApiConfig from "../../Service/ApiComfig"
import { IUser, IUserForm } from "./User.type"

export const getUserList = async () => {
    return await axiosExport.get<IUser[]>(ApiConfig.user)
}

export const createUserList = async (data:IUserForm) => {
    return await axiosExport.post<IUser[]>(ApiConfig.user, data)
}

export const deleteUser = async (id:string) => {
    const url = `${ApiConfig.user}/${id}`
    return await axiosExport.delete(url)
}

export const updateUser = async (id:string, data:IUserForm) => {
    const url = `${ApiConfig.user}/${id}`;
    return await axiosExport.put(url, data); 
}