import React from "react";
import { GoLightBulb } from "react-icons/go";
import { connect, ConnectedProps } from "react-redux";
import { getTranslation } from "../localization";
import { ApplicationState } from "../stores";
import { lightsActionCreators } from "../stores/Lights/actionCreators";
import { LightsState } from "../stores/Lights/state";
import { LifxLight } from "./LifxLight";

const mapStateToProps = (state: ApplicationState) => state.lights;

const connector = connect(mapStateToProps, lightsActionCreators);

type LightsListProps =
    ConnectedProps<typeof connector> &
    LightsState;

export const LightsList = connector((props: LightsListProps) => {
    if (!props.lightsError && !props.isLoadingLights && !props.allLights) {
        props.getAllLights();
    }

    return (
        <div className="bg-base rounded-lg shadow-sm p-3">
            <h3 className="font-weight-light text-warning"><GoLightBulb className="mt-n1" /> {getTranslation().lights}</h3>
            {props.isLoadingLights ? (<p>{getTranslation().loading}</p>) : null}

            {props.lightsError ? <p>{props.lightsError}</p> : null}

            {!props.isLoadingLights && !!props.allLights ?
                props.allLights!.map(light => <LifxLight
                    key={light.id}
                    setState={state => props.setState(state, light)}
                    light={light} />) : null}
        </div>
    )
});
