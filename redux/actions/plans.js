import {
  READ_PLANS,
  READ_ONE_PLAN,
  CREATE_PLAN,
  UPDATE_PLAN,
  DELETE_PLAN,
  PLAN_ERROR,
  CLEAR_PLAN,
  START_PLANS_RELOAD,
  FINISHED_PLANS_RELOAD,
} from "../types/plans";

import { readItemsAsync } from "./equCurd/readItems";
import { readOneItemAsync } from "./equCurd/readOneItem";
import { createItemAsync } from "./equCurd/createItem";
import { updateItemAsync } from "./equCurd/updateItem";
import { deleteItemAsync } from "./equCurd/deleteItem";

export const startPlansReload = () => (dispatch) => {
  dispatch({ type: START_PLANS_RELOAD });
};

export const finishedPlansReload = () => (dispatch) => {
  dispatch({ type: FINISHED_PLANS_RELOAD });
};

export const readPlans = (token) =>
  readItemsAsync({
    url: "https://car-wash-uae.herokuapp.com/api/plans/all",
    successType: READ_PLANS,
    errorType: PLAN_ERROR,
    startReload: startPlansReload,
    finishedReload: finishedPlansReload,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": token,
    },
  });

export const readOnePlan = (id, token) =>
  readOneItemAsync({
    url: `https://car-wash-uae.herokuapp.com/api/Plans/`,
    successType: READ_ONE_PLAN,
    errorType: PLAN_ERROR,
    startReload: startPlansReload,
    finishedReload: finishedPlansReload,
    id,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      "x-access-token": token,
    },
  });
