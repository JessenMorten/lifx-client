import React, { useState } from "react";
import { GoGear } from "react-icons/go";
import { connect, ConnectedProps } from "react-redux";
import { NavLink } from "react-router-dom";
import { getTranslation } from "../localization";
import { ApplicationState } from "../stores";
import { settingsActionCreators } from "../stores/Settings/actionCreators";
import { SettingsState } from "../stores/Settings/state";

const mapStateToProps = (state: ApplicationState) => ({ ...state.settings });

const connector = connect(mapStateToProps, settingsActionCreators);

type SetupProps =
    ConnectedProps<typeof connector> &
    SettingsState;

export const Setup = connector((props: SetupProps) => {
    const [apiKey, setApiKey] = useState(props.lifxApiKey || "");
    const [language, setLanguage] = useState(props.language || "en");

    const save = () => {
        props.saveLifxApiKey(apiKey);
        props.setLanguage(language);
    }

    return (
        <div className="bg-base rounded-lg shadow-sm p-3">
            <h3 className="font-weight-light text-warning"><GoGear className="mt-n1" /> {getTranslation().setup.setup}</h3>
            <hr className="border-warning" />

            <div className="form-group">
                <label>{getTranslation().setup.language}</label>
                <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="form-control bg-dark text-white">
                    <option value="en">English</option>
                    <option value="da">Dansk</option>
                </select>
            </div>

            <div className="form-group">
                <label>{getTranslation().setup.apiKey}</label>
                <input
                    className="form-control bg-dark text-white"
                    onChange={(event) => setApiKey(event.target.value)}
                    value={apiKey} />
                <small><a href="https://api.developer.lifx.com/docs/authentication">{getTranslation().setup.howToAuth}</a></small>
            </div>

            <div className="form-group">
                <NavLink to="/setup/invite" className="btn btn-outline-theme">{getTranslation().invitation.invite}</NavLink>
            </div>

            <NavLink
                onClick={() => save()}
                to="/"
                className="btn btn-theme mr-3">{getTranslation().save}</NavLink>
            <NavLink to="/" className="btn btn-outline-theme">{getTranslation().cancel}</NavLink>
        </div >
    );
});
