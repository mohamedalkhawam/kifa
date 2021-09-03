import {
  READ_INVOICES,
  READ_ONE_INVOICE,
  INVOICE_ERROR,
  START_INVOICES_RELOAD,
  FINISHED_INVOICES_RELOAD,
  CHANGE_INVOICE_STATUS,
} from "../types/invoice";
import { readItemsAsync } from "./equCurd/readItems";
import { readOneItemAsync } from "./equCurd/readOneItem";

export const startInvoiceReload = () => (dispatch) => {
  dispatch({ type: START_INVOICES_RELOAD });
};

export const finishedInvoiceReload = () => (dispatch) => {
  dispatch({ type: FINISHED_INVOICES_RELOAD });
};
import { createItemAsync } from "./equCurd/createItem";

export const readInvoices = (token) =>
  readItemsAsync({
    url: "https://www.kifapos.com/api/get-invoices",
    successType: READ_INVOICES,
    errorType: INVOICE_ERROR,
    startReload: startInvoiceReload,
    finishedReload: finishedInvoiceReload,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const readOneInvoice = (formData, token) =>
  readOneItemAsync({
    url: `https://www.kifapos.com/api/invoice-details`,
    successType: READ_ONE_INVOICE,
    errorType: INVOICE_ERROR,
    startReload: startInvoiceReload,
    finishedReload: finishedInvoiceReload,
    id: formData.id,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const changeInvoiceStatus = (formData, token) =>
  createItemAsync({
    url: "https://www.kifapos.com/api/change-invoice-status",
    successType: CHANGE_INVOICE_STATUS,
    errorType: INVOICE_ERROR,
    startReload: startInvoiceReload,
    finishedReload: finishedInvoiceReload,
    title: "Orders",
    formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
