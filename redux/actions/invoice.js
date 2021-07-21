import {
  READ_INVOICES,
  READ_ONE_INVOICE,
  INVOICE_ERROR,
  START_INVOICES_RELOAD,
  FINISHED_INVOICES_RELOAD,
} from "../types/invoice";
import axios from "axios";
import { readItemsAsync } from "./equCurd/readItems";
import { readOneItemAsync } from "./equCurd/readOneItem";

export const startInvoiceReload = () => (dispatch) => {
  dispatch({ type: START_INVOICES_RELOAD });
};

export const finishedInvoiceReload = () => (dispatch) => {
  dispatch({ type: FINISHED_INVOICES_RELOAD });
};

export const readInvoices = (token) =>
  readItemsAsync({
    url: "http://139.162.165.250/kifa/api/get-invoices",
    successType: READ_INVOICES,
    errorType: INVOICE_ERROR,
    startReload: startInvoiceReload,
    finishedReload: finishedInvoiceReload,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const readOneInvoice = (formData, token) => {
  return readItemsAsync({
    url: `http://139.162.165.250/kifa/api/invoice-details`,
    successType: READ_ONE_INVOICE,
    errorType: INVOICE_ERROR,
    startReload: startInvoiceReload,
    finishedReload: finishedInvoiceReload,
    formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
