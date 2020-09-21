import React from "react";
import { GoStar } from "react-icons/go";
import { connect, ConnectedProps } from "react-redux";
import { getTranslation } from "../localization";
import { ApplicationState } from "../stores";
import { lightsActionCreators } from "../stores/Lights/actionCreators";
import { LightsState } from "../stores/Lights/state";
import { LifxScene } from "./LifxScene";

const mapStateToProps = (state: ApplicationState) => state.lights;


const connector = connect(mapStateToProps, lightsActionCreators);

type ScenesListProps =
    ConnectedProps<typeof connector> &
    LightsState;

export const ScenesList = connector((props: ScenesListProps) => {
    if (!props.scenesError && !props.isLoadingScenes && !props.allScenes) {
        props.getAllScenes();
    }

    return (
        <div className="bg-base rounded-lg shadow-sm p-3">
            <h3 className="font-weight-light text-success"><GoStar className="mt-n1" /> {getTranslation().scenes}</h3>
            {props.isLoadingScenes ? (<p>{getTranslation().loading}</p>) : null}

            {props.scenesError ? <p>{props.scenesError}</p> : null}

            {!props.isLoadingScenes && !!props.allScenes ?
                props.allScenes!.map(scene => <LifxScene
                    scene={scene}
                    activateScene={() => props.activateScene(scene)}
                    key={scene.uuid} />) : null}
        </div>
    )
});
