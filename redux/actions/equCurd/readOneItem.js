import axios from 'axios';
import { setAlert } from '../alert';
import { setProgress } from '../app';

export const readOneItemAsync = (data) => {
  return async (dispatch) => {
    let config;
    if (data.type === 'file') {
      let percentCompleted;
      config = {
        onUploadProgress: (progressEvent) => {
          percentCompleted = Math.floor(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          dispatch(setProgress(percentCompleted));
        },
        headers: data.headers,
      };
    } else {
      config = {
        headers: data.headers,
      };
    }
    const onSuccess = (success) => {
      dispatch({ type: data.successType, payload: success.data });
      !data.noReload && dispatch(data.finishedReload());
      return success;
    };
    const onError = (error) => {
      dispatch(setAlert('error something went wrong', 'error'));
      dispatch({ type: data.errorType });
      !data.noReload && dispatch(data.finishedReload());
      return error;
    };
    try {
      !data.noReload && dispatch(data.startReload());
      const success = await axios.get(`${data.url}/${data.id}`, config);
      return onSuccess(success);
    } catch (error) {
      return onError(error);
    }
  };
};
