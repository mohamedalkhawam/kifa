import {
  CREATE_ORDER,
  ORDER_ERROR,
  START_ORDERS_RELOAD,
  FINISHED_ORDERS_RELOAD,
} from "../types/order";
import { createItemAsync } from "./equCurd/createItem";
export const startorderReload = () => (dispatch) => {
  dispatch({ type: START_ORDERS_RELOAD });
};
export const finishedOrderReload = () => (dispatch) => {
  dispatch({ type: FINISHED_ORDERS_RELOAD });
};

export const createOrder = (formData, token) =>
  createItemAsync({
    url: "http://www.kifapos.com/api/add-order",
    successType: CREATE_ORDER,
    errorType: ORDER_ERROR,
    startReload: startorderReload,
    finishedReload: finishedOrderReload,
    title: "Orders",
    formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
