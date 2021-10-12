import {
  ADD_PRODUCT,
  REMOVE_PRODUCT,
  ADD_ONE,
  REMOVE_ONE,
  CLEAR_LIST,
} from "../types/app";

const initialState = {
  list: [],
};

export default appReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ADD_PRODUCT:
      return {
        ...state,
        list:
          state.list.find((item) => item.id === payload.id) &&
          state.list.find((item) => item.id === payload.id).id
            ? state.list.filter((item) =>
                item.id === payload.id
                  ? (item.quantity = item.quantity + 1)
                  : item.quantity
              )
            : [
                ...state.list,
                {
                  id: payload.id,
                  name: payload.name,
                  price:
                    typeof payload.price === "undefined"
                      ? payload.buying_price
                      : payload.price,
                  quantity: 1,
                  discount: payload.discount,
                  buying_price_after_discount:
                    payload.buying_price_after_discount,
                },
              ],
      };
    case REMOVE_PRODUCT:
      return {
        ...state,
        list: state.list.filter((item) => item.id !== payload),
      };
    case ADD_ONE:
      return {
        ...state,
        list: state.list.filter((item) =>
          item.id === payload
            ? (item.quantity = item.quantity + 1)
            : item.quantity
        ),
      };
    case REMOVE_ONE:
      return {
        ...state,
        list: state.list.filter((item) =>
          item.id === payload
            ? item.quantity > 0
              ? (item.quantity = item.quantity - 1)
              : (item.quantity = 0)
            : item.quantity
        ),
      };
    case CLEAR_LIST:
      return { ...state, list: [] };
    default:
      return state;
  }
};
