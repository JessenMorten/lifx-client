import { AppThunkAction } from '..';
import { SettingsAction } from './actions';

export const localStorageKeys = {
    lifxApiKey: "settings:lifxApiKey",
    languageKey: "settings:language"
};

export const settingsActionCreators = {
    /**
     * Load settings.
     */
    loadSettings: (): AppThunkAction<SettingsAction> => (dispatch, getApplicationState) => {
        dispatch({
            type: "LOAD_SETTINGS",
            lifxApiKey: localStorage.getItem(localStorageKeys.lifxApiKey) || ""
        });
    },

    /**
     * Save api key.
     */
    saveLifxApiKey: (apiKey: string): AppThunkAction<SettingsAction> => (dispatch, getApplicationState) => {
        localStorage.setItem(localStorageKeys.lifxApiKey, apiKey);
        dispatch({ type: "SAVE_LIFX_API_KEY", lifxApiKey: apiKey });
    },

    setLanguage: (language: string): AppThunkAction<SettingsAction> => (dispatch, getApplicationState) => {
        localStorage.setItem(localStorageKeys.languageKey, language);
        dispatch({ type: "SET_LANGUAGE", language });
    }
}
