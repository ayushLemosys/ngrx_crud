import { User } from "../models/user";

export interface UserModal {
    userList: User[],
    errorMessage: string,
    userObj: User
}