import { LightsState } from "./state";
import { Action, Reducer } from "redux";
import { LightsAction } from "./actions";

const unloadedState: LightsState = {
    allLights: undefined,
    isLoadingLights: false,
    lightsError: undefined,
    allScenes: undefined,
    isLoadingScenes: false,
    scenesError: undefined
};

export const lightsReducer: Reducer<LightsState> = (state: LightsState | undefined, incomingAction: Action) => {
    if (!state) {
        return unloadedState;
    }

    const action = incomingAction as LightsAction;
    switch (action.type) {
        case "REQUEST_ALL_LIGHTS":
            return { ...state, isLoadingLights: true };
        case "RECEIVE_ALL_LIGHTS":
            return { ...state, allLights: action.lights, isLoadingLights: false, lightsError: undefined };
        case "REQUEST_ALL_LIGHTS_ERROR":
            return { ...state, lightsError: action.error, isLoadingLights: false }
        case "REQUEST_ALL_SCENES":
            return { ...state, isLoadingScenes: true };
        case "RECEIVE_ALL_SCENES":
            return { ...state, allScenes: action.scenes, isLoadingScenes: false, scenesError: undefined }
        case "REQUEST_ALL_SCENES_ERROR":
            return { ...state, scenesError: action.error, isLoadingScenes: false }
        default:
            return state;
    }
}
