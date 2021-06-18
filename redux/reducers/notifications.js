import {
  READ_NOTIFICATIONS,
  NOTIFICATIONS_ERROR,
  START_NOTIFICATIONS_RELOAD,
  FINISHED_NOTIFICATIONS_RELOAD,
  DELETE_NOTIFICATIONS,
} from "../types/notifications";

const initialState = {
  notifications: [],
  user: {},
  error: {},
  loading: false,
  readable: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case READ_NOTIFICATIONS:
      return {
        ...state,
        notifications: payload.data,
        readable: true,
      };
    case DELETE_NOTIFICATIONS:
      return {
        ...state,
        notifications: [],
      };
    case START_NOTIFICATIONS_RELOAD:
      return {
        ...state,
        loading: true,
      };

    case FINISHED_NOTIFICATIONS_RELOAD:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
