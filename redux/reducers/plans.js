import {
  READ_PLANS,
  READ_ONE_PLAN,
  CREATE_PLAN,
  UPDATE_PLAN,
  DELETE_PLAN,
  CLEAR_PLAN,
  START_PLANS_RELOAD,
  FINISHED_PLANS_RELOAD,
} from "../types/plans";

const initialState = {
  plans: [],
  plan: {},
  error: {},
  loading: false,
  readable: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case READ_PLANS:
      return {
        ...state,
        plans: payload.data,
        readable: true,
      };
    case READ_ONE_PLAN:
      return {
        ...state,
        plan: payload.data,
      };

    case START_PLANS_RELOAD:
      return {
        ...state,
        loading: true,
      };

    case FINISHED_PLANS_RELOAD:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
