export interface LightsState {
    allLights?: Light[];
    isLoadingLights?: boolean;
    lightsError?: string;
    allScenes?: Scene[];
    isLoadingScenes?: boolean;
    scenesError?: string;
}

export interface Color {
    hue: number;
    saturation: number;
    kelvin: number;
}

export interface Group {
    id: string;
    name: string;
}

export interface Location {
    id: string;
    name: string;
}

export interface ProductCapabilities {
    has_color: boolean;
    has_variable_color_temp: boolean;
    has_ir: boolean;
    has_chain: boolean;
    has_matrix: boolean;
    has_multizone: boolean;
    min_kelvin: number;
    max_kelvin: number;
}

export interface Product {
    name: string;
    identifier: string;
    company: string;
    capabilities: ProductCapabilities;
}

export interface Light {
    id: string;
    uuid: string;
    label: string;
    connected: boolean;
    power: "on" | "off";
    color: Color;
    brightness: number;
    group: Group;
    location: Location;
    product: Product;
    last_seen: string;
    seconds_since_seen: number;
}

export interface Account {
    uuid: string;
}

export interface SceneState {
    selector: string;
    color?: Color;
    brightness?: number;
}

export interface Scene {
    uuid: string;
    name: string;
    account: Account;
    states: SceneState[];
    created_at: number;
    updated_at: number;
}

export interface SetStateRequest {
    power?: "on" | "off";
}
