import { createFeatureSelector, createSelector } from "@ngrx/store";
import { UserModal } from "./User.Modal";


const getUsersState = createFeatureSelector<UserModal>('user');

export const getUserList = createSelector(getUsersState, (state)=> state.userList);

export const getUser = createSelector(getUsersState, (state)=> state.userObj);