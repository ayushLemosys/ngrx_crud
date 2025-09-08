import { createAction, props } from "@ngrx/store";
import { User } from "../models/user";

const LOAD_USER = 'LOAD ALL USER';
const LOAD_USER_SUCCESS = 'LOAD ALL USER SUCCESS';
const LOAD_USER_FAIL = 'LOAD ALL USER FAIL';

const DELETE_USER = 'DELETE USER';
const DELETE_USER_SUCCESS = 'DELETE USER SUCCESS';

const ADD_USER = 'ADD USER';
const ADD_USER_SUCCESS = 'ADD USER SUCCESS';

const UPDATE_USER = 'UPDATE USER';
const UPDATE_USER_SUCCESS = 'UPDATE USER SUCCESS';

const GET_USER_DETAIL = 'GET USER DETAIL';
// GET ALL USER
export const loadUser = createAction(LOAD_USER);

export const loadUserSuccess = createAction(LOAD_USER_SUCCESS, props<{ list: User[] }>());

export const loadUserFail = createAction(LOAD_USER_FAIL, props<{ errorMsg: string }>());
// DELTE USER
export const deleteUser = createAction(DELETE_USER, props<{ userId: number }>());

export const deleteUserSuccess = createAction(DELETE_USER_SUCCESS, props<{ userId: number }>());

// ADD USER
export const addUser = createAction(ADD_USER, props<{ user: User }>());

export const addUserSuccess = createAction(ADD_USER_SUCCESS, props<{ user: User }>());

// UPDATE USER
export const updateUser = createAction(UPDATE_USER, props<{ user: User, userId: number }>());

export const updateUserSuccess = createAction(UPDATE_USER_SUCCESS, props<{ user: User, userId: number }>());

// GET USER
export const getUserDetail = createAction(GET_USER_DETAIL, props<{ userId: number }>());

// EMPTY
export const emptyAction = createAction('EMPTY ACTION');