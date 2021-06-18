import {
  READ_USERS,
  READ_ONE_USER,
  CREATE_USER,
  UPDATE_USER,
  DELETE_USER,
  CLEAR_USER,
  START_USERS_RELOAD,
  FINISHED_USERS_RELOAD,
  UPDATE_PROFILE,
} from "../types/user";

const initialState = {
  users: [],
  user: {},
  error: {},
  profile: {},
  loading: false,
  readable: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case READ_USERS:
      return {
        ...state,
        users: payload.data,
        readable: true,
      };

    case READ_ONE_USER:
      return {
        ...state,
        user: payload.data,
      };
    case CREATE_USER:
      return {
        ...state,
        users: [payload.date, ...state.users],
      };
    case UPDATE_USER:
      return {
        ...state,
        users: [
          ...state.users.map((user) =>
            user._id === payload.data.id ? payload.data : user
          ),
        ],
      };
    case UPDATE_PROFILE:
      return {
        ...state,
        profile: payload.data,
      };
    case DELETE_USER:
      return {
        ...state,
        users: [...state.users.filter((user) => user._id !== payload.data._id)],
      };
    case CLEAR_USER:
      return {
        ...state,
        user: {},
      };
    case START_USERS_RELOAD:
      return {
        ...state,
        loading: true,
      };

    case FINISHED_USERS_RELOAD:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
