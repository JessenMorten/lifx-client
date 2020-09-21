import { LightsAction } from './actions';
import { AppThunkAction } from '..';
import { Light, Scene, SetStateRequest } from './state';

const apiBase = "https://api.lifx.com/v1";

const get = (path: string, apiKey?: string) => {
    const headers = new Headers();
    headers.append('Accept', 'application/json');
    headers.append('Authorization', 'Bearer ' + apiKey);
    return fetch(apiBase + path, { headers });
}

const put = (path: string, payload: any, apiKey?: string) => {
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'Bearer ' + apiKey);
    return fetch(apiBase + path, { headers, method: "PUT", body: JSON.stringify(payload) });
}

export const lightsActionCreators = {
    /**
     * Get all LIFX lights.
     */
    getAllLights: (): AppThunkAction<LightsAction> => (dispatch, getApplicationState) => {
        dispatch({ type: "REQUEST_ALL_LIGHTS" });

        get("/lights/all", getApplicationState().settings!.lifxApiKey)
            .then(response => response.json())
            .then((result: any) => {
                if (Array.isArray(result)) {
                    dispatch({ type: "RECEIVE_ALL_LIGHTS", lights: result as Light[] });
                } else if (result.error && typeof result.error === "string") {
                    dispatch({ type: "REQUEST_ALL_LIGHTS_ERROR", error: result.error });
                } else {
                    dispatch({ type: "REQUEST_ALL_LIGHTS_ERROR", error: "Unknown error" });
                }
            })
            .catch((error) => alert(error));
    },

    /**
    * Set state.
    */
    setState: (state: SetStateRequest, light?: Light): AppThunkAction<LightsAction> => (dispatch, getApplicationState) => {
        let states: any[];

        if (light) {
            states = [{
                selector: `id:${light.id}`,
                ...state
            }];
        } else {
            states = getApplicationState().lights!.allLights!
                .map(light => ({
                    selector: `id:${light.id}`,
                    ...state
                }));
        }

        const selectors = states.map(s => s.selector);
        const newLights = [...getApplicationState().lights!.allLights!];
        for (let i = 0; i < newLights.length; i++) {
            if (selectors.includes("id:" + newLights[i].id)) {
                newLights[i].power = state.power || newLights[i].power;
            }
        }

        dispatch({ type: "RECEIVE_ALL_LIGHTS", lights: newLights });
        put("/lights/states", { states }, getApplicationState().settings!.lifxApiKey);
    },

    /**
     * Get all LIFX scenes.
     */
    getAllScenes: (): AppThunkAction<LightsAction> => (dispatch, getApplicationState) => {
        dispatch({ type: "REQUEST_ALL_SCENES" });

        get("/scenes", getApplicationState().settings!.lifxApiKey)
            .then(response => response.json())
            .then((result: any) => {
                if (Array.isArray(result)) {
                    dispatch({ type: "RECEIVE_ALL_SCENES", scenes: result as Scene[] });
                } else if (result.error && typeof result.error === "string") {
                    dispatch({ type: "REQUEST_ALL_SCENES_ERROR", error: result.error });
                } else {
                    dispatch({ type: "REQUEST_ALL_SCENES_ERROR", error: "Unknown error" });
                }
            })
            .catch((error) => alert(error));
    },

    /**
     * Activate scene.
     */
    activateScene: (scene: Scene): AppThunkAction<LightsAction> => (dispatch, getApplicationState) => {
        const selectors = scene.states.map(s => s.selector);
        const newLights = [...getApplicationState().lights!.allLights!];
        for (let i = 0; i < newLights.length; i++) {
            if (selectors.includes("id:" + newLights[i].id)) {
                newLights[i].power = "on";
            }
        }

        dispatch({ type: "RECEIVE_ALL_LIGHTS", lights: newLights });
        put(`/scenes/scene_id:${scene.uuid}/activate`, { duration: 0.0 }, getApplicationState().settings!.lifxApiKey);
    },
}
