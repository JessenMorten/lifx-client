import { Light, Scene } from "./state";

export interface RequestAllLights {
    type: "REQUEST_ALL_LIGHTS";
}

export interface ReceiveAllLights {
    type: "RECEIVE_ALL_LIGHTS";
    lights: Light[]
}

export interface RequestAllLightsError {
    type: "REQUEST_ALL_LIGHTS_ERROR";
    error: string;
}

export interface RequestAllScenes {
    type: "REQUEST_ALL_SCENES";
}

export interface ReceiveAllScenes {
    type: "RECEIVE_ALL_SCENES";
    scenes: Scene[]
}

export interface RequestAllScenesError {
    type: "REQUEST_ALL_SCENES_ERROR";
    error: string;
}

export type LightsAction =
    RequestAllLights | ReceiveAllLights | RequestAllLightsError |
    RequestAllScenes | ReceiveAllScenes | RequestAllScenesError;