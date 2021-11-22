import {
  READ_INVOICES,
  READ_ONE_INVOICE,
  START_INVOICES_RELOAD,
  FINISHED_INVOICES_RELOAD,
  CHANGE_INVOICE_STATUS,
  CLEAR_INVOICE,
} from "../types/invoice";

const initialState = {
  invoices: [],
  invoice: {},
  pendingInvoices: [],
  completedInvoices: [],
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
        invoices: payload.data,
        readable: true,
        pendingInvoices: payload.data.filter((item) => item.is_paid === 0),
        completedInvoices: payload.data.filter((item) => item.is_paid === 1),
      };

    case READ_ONE_INVOICE:
      return {
        ...state,
        invoice: { ...payload.data },
      };
    case CHANGE_INVOICE_STATUS:
      return {
        ...state,
        invoices: [
          ...state.invoices.map((invoice) =>
            invoice.id === payload.invoice.id ? payload.invoice : invoice
          ),
        ],
      };
    case CLEAR_INVOICE:
      return {
        ...state,
        invoice: {},
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
