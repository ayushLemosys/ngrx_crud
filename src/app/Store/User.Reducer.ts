import { createReducer, on } from "@ngrx/store";
import { userState } from "./User.State";
import { addUserSuccess, deleteUserSuccess, getUserDetail, loadUserFail, loadUserSuccess, updateUserSuccess } from "./User.Action";

const _userReducer = createReducer(userState,
    on(loadUserSuccess, (state, action) => {
        return {
            ...state,
            userList: action.list,
            errorMessage: ''
        }
    }),
    on(loadUserFail, (state, action) => {
        return {
            ...state,
            userList: [],
            errorMessage: action.errorMsg
        }
    }),
    on(deleteUserSuccess, (state, action) => {
        const _otherUsers = state.userList.filter((user) => user.id !== action.userId);
        return {
            ...state,
            userList: _otherUsers,
            errorMessage: ''
        }
    }),
    on(addUserSuccess, (state, action) => {
        const newUserList = [...state.userList, action.user];
        return {
            ...state,
            userList: newUserList,
            errorMessage: ''
        }
    }),
    on(updateUserSuccess, (state, action) => {
        const newUserList = state.userList.map((user) => {
            return user.id === action.userId ? action.user : user
        });
        return {
            ...state,
            userList: newUserList,
            errorMessage: ''
        }
    }),
    on(getUserDetail, (state, action) => {
        const newUserList = state.userList.find(u => u.id === action.userId);
        return {
            ...state,
            userObj: newUserList ? newUserList : {} as any,
        }
    }),
    
);

export function userReducer(state: any, action: any) {
    return _userReducer(state, action);
}