import {
  READ_CUSTOMERS,
  READ_ONE_CUSTOMER,
  CREATE_CUSTOMER,
  UPDATE_CUSTOMER,
  CUSTOMER_ERROR,
  START_CUSTOMERS_RELOAD,
  FINISHED_CUSTOMERS_RELOAD,
} from "../types/customers";

import { readItemsAsync } from "./equCurd/readItems";
import { readOneItemAsync } from "./equCurd/readOneItem";
import { createItemAsync } from "./equCurd/createItem";
import { updateItemAsync } from "./equCurd/updateItem";

export const startCustomersReload = () => (dispatch) => {
  dispatch({ type: START_CUSTOMERS_RELOAD });
};

export const finishedCustomersReload = () => (dispatch) => {
  dispatch({ type: FINISHED_CUSTOMERS_RELOAD });
};

export const readCustomers = (token) =>
  readItemsAsync({
    url: "http://www.kifapos.com/api/list-customers",
    successType: READ_CUSTOMERS,
    errorType: CUSTOMER_ERROR,
    startReload: startCustomersReload,
    finishedReload: finishedCustomersReload,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const readOneCustomer = (id, token) =>
  readOneItemAsync({
    url: `http://www.kifapos.com/api/list-customers`,
    successType: READ_ONE_CUSTOMER,
    errorType: CUSTOMER_ERROR,
    startReload: startCustomersReload,
    finishedReload: finishedCustomersReload,
    id,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const createCustomer = (formData, token) =>
  createItemAsync({
    url: "http://www.kifapos.com/api/create-customer",
    successType: CREATE_CUSTOMER,
    errorType: CUSTOMER_ERROR,
    startReload: startCustomersReload,
    finishedReload: finishedCustomersReload,
    title: "Customers",
    formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const updateCustomer = (formData, token) =>
  updateItemAsync({
    url: "http://www.kifapos.com/api/update-customer",
    successType: UPDATE_CUSTOMER,
    errorType: CUSTOMER_ERROR,
    startReload: startCustomersReload,
    finishedReload: finishedCustomersReload,
    title: "Customers",
    formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const clearCustomer = () => (dispatch) => {
  dispatch({ type: CLEAR_CUSTOMER });
};
