import React from "react";
import { connect, ConnectedProps } from "react-redux";
import { RouteComponentProps } from "react-router-dom";
import { ApplicationState } from "../stores";
import { settingsActionCreators } from "../stores/Settings/actionCreators";
import { SettingsState } from "../stores/Settings/state";
import { LightsList } from "./LightsList";
import { ScenesList } from "./ScenesList";

const mapStateToProps = (state: ApplicationState) => ({ ...state.settings });

const connector = connect(mapStateToProps, settingsActionCreators);

type HomeProps =
    ConnectedProps<typeof connector> &
    SettingsState &
    RouteComponentProps<{}>;

export const Home = connector((props: HomeProps) => {
    if (!props.hasBeenLoaded) {
        props.loadSettings();
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    <ScenesList />
                </div>
                <div className="col-md-6 mt-3 mt-md-0">
                    <LightsList />
                </div>
            </div>
        </div>
    )
});
