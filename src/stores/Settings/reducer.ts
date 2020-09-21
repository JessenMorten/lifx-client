import { SettingsState } from "./state";
import { Action, Reducer } from "redux";
import { SettingsAction } from "./actions";
import { localStorageKeys } from "./actionCreators";

const unloadedState: SettingsState = {
    lifxApiKey: localStorage.getItem(localStorageKeys.lifxApiKey) || "",
    language: localStorage.getItem(localStorageKeys.languageKey) || "en"
};

export const settingsReducer: Reducer<SettingsState> = (state: SettingsState | undefined, incomingAction: Action) => {
    if (!state) {
        return unloadedState;
    }

    const action = incomingAction as SettingsAction;
    switch (action.type) {
        case "LOAD_SETTINGS":
            return { ...state, lifxApiKey: action.lifxApiKey, hasBeenLoaded: true }
        case "SAVE_LIFX_API_KEY":
            return { ...state, lifxApiKey: action.lifxApiKey };
        case "SET_LANGUAGE":
            return { ...state, language: action.language };
        default:
            return state;
    }
}
