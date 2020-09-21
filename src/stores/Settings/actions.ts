export interface LoadSettings {
    type: "LOAD_SETTINGS";
    lifxApiKey: string;
}

export interface SaveLifxApiKey {
    type: "SAVE_LIFX_API_KEY";
    lifxApiKey: string;
}

export interface SetLanguage {
    type: "SET_LANGUAGE";
    language: string;
}

export type SettingsAction = LoadSettings | SaveLifxApiKey | SetLanguage;
