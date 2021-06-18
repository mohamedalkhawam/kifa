import {
  READ_USERS,
  READ_ONE_USER,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  USER_ERROR,
  CLEAR_USER,
  START_USERS_RELOAD,
  FINISHED_USERS_RELOAD,
  UPDATE_PROFILE,
  READ_PROFILE,
} from "../types/user";

import { readItemsAsync } from "./equCurd/readItems";
import { readOneItemAsync } from "./equCurd/readOneItem";
import { createItemAsync } from "./equCurd/createItem";
import { updateItemAsync } from "./equCurd/updateItem";
import { deleteItemAsync } from "./equCurd/deleteItem";

export const startUsersReload = () => (dispatch) => {
  dispatch({ type: START_USERS_RELOAD });
};

export const finishedUsersReload = () => (dispatch) => {
  dispatch({ type: FINISHED_USERS_RELOAD });
};

export const readUsers = (token) =>
  readItemsAsync({
    url: "https://car-wash-uae.herokuapp.com/api/users/all",
    successType: READ_USERS,
    errorType: USER_ERROR,
    startReload: startUsersReload,
    finishedReload: finishedUsersReload,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": token,
    },
  });
export const readProfile = (token) =>
  readItemsAsync({
    url: "https://car-wash-uae.herokuapp.com/api/auth/profile/",
    successType: READ_PROFILE,
    errorType: USER_ERROR,
    startReload: startUsersReload,
    finishedReload: finishedUsersReload,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": token,
    },
  });

export const readOneUser = (id, token) =>
  readOneItemAsync({
    url: `https://car-wash-uae.herokuapp.com/api/users/`,
    successType: READ_ONE_USER,
    errorType: USER_ERROR,
    startReload: startUsersReload,
    finishedReload: finishedUsersReload,
    id,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": token,
    },
  });

export const createUser = (formData, token) =>
  createItemAsync({
    url: "https://car-wash-uae.herokuapp.com/api/auth/register",
    successType: CREATE_USER,
    errorType: USER_ERROR,
    startReload: startUsersReload,
    finishedReload: finishedUsersReload,
    title: "User",
    formData,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": token,
    },
  });

export const updateUser = (formData, token) =>
  updateItemAsync({
    url: "https://car-wash-uae.herokuapp.com/api/users/",
    successType: UPDATE_USER,
    errorType: USER_ERROR,
    startReload: startUsersReload,
    finishedReload: finishedUsersReload,
    title: "User",
    formData,
    id: formData._id,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": token,
    },
  });
export const updateProfile = (formData, token) =>
  updateItemAsync({
    url: "https://car-wash-uae.herokuapp.com/api/auth/profile/",
    successType: UPDATE_PROFILE,
    errorType: USER_ERROR,
    startReload: startUsersReload,
    finishedReload: finishedUsersReload,
    title: "User",
    formData,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": token,
    },
  });
export const deleteUser = (id, token) =>
  deleteItemAsync({
    url: "https://car-wash-uae.herokuapp.com/api/users",
    successType: DELETE_USER,
    errorType: USER_ERROR,
    startReload: startUsersReload,
    finishedReload: finishedUsersReload,
    title: "User",
    id: id,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": token,
    },
  });

export const clearUser = () => (dispatch) => {
  dispatch({ type: CLEAR_USER });
};
