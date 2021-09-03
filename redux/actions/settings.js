import {
  READ_SETTINGS,
  UPDATE_SETTING,
  SETTING_ERROR,
  CLEAR_SETTING,
  START_SETTINGS_RELOAD,
  FINISHED_SETTINGS_RELOAD,
} from "../types/settings";
import { readItemsAsync } from "./equCurd/readItems";
import { updateItemAsync } from "./equCurd/updateItem";

export const startSettingsReload = () => (dispatch) => {
  dispatch({ type: START_SETTINGS_RELOAD });
};

export const finishedSettingsReload = () => (dispatch) => {
  dispatch({ type: FINISHED_SETTINGS_RELOAD });
};

export const readSettings = (token) =>
  readItemsAsync({
    url: "https://www.kifapos.com/api/settings",
    successType: READ_SETTINGS,
    errorType: SETTING_ERROR,
    startReload: startSettingsReload,
    finishedReload: finishedSettingsReload,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

export const updateSettings = (token, formData) =>
  updateItemAsync({
    url: "https://www.kifapos.com/api/settings",
    successType: UPDATE_SETTING,
    errorType: SETTING_ERROR,
    startReload: startSettingsReload,
    finishedReload: finishedSettingsReload,
    title: "Settings",
    formData,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
export const clearSettings = () => (dispatch) => {
  dispatch({ type: CLEAR_SETTING });
};
