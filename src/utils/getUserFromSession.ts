import { SessionStorageService } from "services/SessionStorageService";


export function getUserFromSession(){
    return SessionStorageService.getItem("user")
}

export const getUser = getUserFromSession();