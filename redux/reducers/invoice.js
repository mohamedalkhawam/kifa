import {
  READ_INVOICES,
  READ_ONE_INVOICE,
  START_INVOICES_RELOAD,
  FINISHED_INVOICES_RELOAD,
} from "../types/invoice";

const initialState = {
  invoices: [],
  pendingInvoices: [],
  invoice: {},
  error: {},
  loading: false,
  readable: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case READ_INVOICES:
      return {
        ...state,
        invoices: payload.data.invoices,
        pendingInvoices: payload.data.pendingInvoices,
        readable: true,
      };

    case READ_ONE_INVOICE:
      return {
        ...state,
        invoice: payload.data,
      };

    case START_INVOICES_RELOAD:
      return {
        ...state,
        loading: true,
      };

    case FINISHED_INVOICES_RELOAD:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
