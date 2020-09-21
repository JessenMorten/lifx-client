import { createStore, applyMiddleware, combineReducers } from "redux";
import { createLogger } from "redux-logger";
import ReduxThunk from "redux-thunk";
import { lightsReducer } from "./Lights/reducer";
import { LightsState } from "./Lights/state";
import { SettingsState } from "./Settings/state";
import { settingsReducer } from "./Settings/reducer";

/**
 * Application state.
 */
export interface ApplicationState {
    lights?: LightsState;
    settings?: SettingsState;
}

/**
 * Create application store.
 */
export const createApplicationStore = () => {
    const rootReducer = combineReducers({
        lights: lightsReducer,
        settings: settingsReducer
    });

    const middleware = process.env.NODE_ENV === "development" ?
        applyMiddleware(ReduxThunk, createLogger()) :
        applyMiddleware(ReduxThunk);

    return createStore(rootReducer, middleware);
};

/**
 * App Thunk action.
 */
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getApplicationState: () => ApplicationState): void;
}
