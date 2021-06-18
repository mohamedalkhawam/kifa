import {
  READ_FILES,
  READ_ONE_FILE,
  CREATE_FILE,
  START_FILES_RELOAD,
  FINISHED_FILES_RELOAD,
} from "../types/file";

const initialState = {
  files: [],
  file: {},
  error: {},
  loading: false,
  readable: false,
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case READ_FILES:
      return {
        ...state,
        files: payload.data,
        readable: true,
      };
    case READ_ONE_FILE:
      return {
        ...state,
        file: payload.data,
      };
    case CREATE_FILE:
      return {
        ...state,
        files: [payload.data, ...state.files],
      };

    case START_FILES_RELOAD:
      return {
        ...state,
        loading: true,
      };

    case FINISHED_FILES_RELOAD:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
}
