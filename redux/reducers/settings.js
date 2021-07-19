import {
  READ_SETTINGS,
  UPDATE_SETTING,
  CLEAR_SETTING,
  START_SETTINGS_RELOAD,
  FINISHED_SETTINGS_RELOAD,
} from "../types/settings";

const initialState = {
  settings: {},
  error: {},
  loading: false,
  readable: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case READ_SETTINGS:
      return {
        ...state,
        settings: payload.data,
        readable: true,
      };
    case UPDATE_SETTING:
      return {
        ...state,
        settings: { ...payload.data },
      };
    case CLEAR_SETTING:
      return { ...state, settings: {} };
    case START_SETTINGS_RELOAD:
      return {
        ...state,
        loading: true,
      };

    case FINISHED_SETTINGS_RELOAD:
      return {
        ...state,
        loading: false,
      };

    default:
      return state;
  }
}
