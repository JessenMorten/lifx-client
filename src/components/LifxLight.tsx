import React from "react";
import { GoZap } from "react-icons/go";
import { Light, SetStateRequest } from "../stores/Lights/state";

type LifxLightProps = {
    light: Light,
    setState(state: SetStateRequest): void
};

export const LifxLight = (props: LifxLightProps) => {
    const isOn = props.light.power === "on";

    return (
        <div
            role="button"
            onClick={() => props.setState({ power: isOn ? "off" : "on" })}
            className={`p-3 shadow-sm rounded-lg mt-3 bg-background border ${isOn ? "border-warning" : "border-secondary"}`}>
            <h5 className="mb-0 font-weight-light">
                <GoZap className={`mt-n1 mr-3 ${isOn ? "text-warning" : "text-secondary"}`} />
                {props.light.label}
            </h5>
        </div>
    );
};
