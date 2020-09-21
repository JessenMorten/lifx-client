import React, { useState } from "react";
import { GoPlay } from "react-icons/go";
import { Scene } from "../stores/Lights/state";

type LifxLightProps = {
    scene: Scene,
    activateScene(): void
};

export const LifxScene = (props: LifxLightProps) => {
    const [isActive, setIsActive] = useState(false);

    const activate = () => {
        setIsActive(true);
        props.activateScene();
        setTimeout(() => setIsActive(false), 1000);
    }

    return (
        <div
            role="button"
            onClick={() => activate()}
            className={`bg-background p-3 shadow-sm rounded-lg mt-3 border ${isActive ? "border-success" : "border-secondary"}`}>
            <h5 className="mb-0 font-weight-light">
                <GoPlay className={`mt-n1 mr-3 ${isActive ? "text-success" : "text-secondary"}`} />
                {props.scene.name}
            </h5>
        </div >
    );
};
