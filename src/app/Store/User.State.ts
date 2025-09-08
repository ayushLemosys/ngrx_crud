import { User } from "../models/user";
import { UserModal } from "./User.Modal";

export const userState: UserModal = {
    userList: [],
    errorMessage: '',
    userObj: {} as User
}