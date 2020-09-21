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

type InvitationProps =
    ConnectedProps<typeof connector> &
    SettingsState;

export const Invite = connector((props: InvitationProps) => {
    const [isDone, setIsDone] = useState(false);
    const [sender, setSender] = useState("");
    const [recipient, setRecipient] = useState("");

    const buildInvitationUrl = () => {
        let url = window.location.origin;
        url += `/#/invitation/${props.lifxApiKey}/${btoa(recipient)}/${btoa(sender)}`;
        return url;
    }

    const isFormValid = () => {
        if (sender.trim().length < 3) return false;
        if (recipient.trim().length < 3) return false;

        return true;
    }

    return (
        <div className="bg-base rounded-lg shadow-sm p-3">
            <h3 className="font-weight-light text-warning"><GoGear className="mt-n1" /> {getTranslation().invitation.invite}</h3>
            <hr className="border-warning" />

            {isDone ? (
                <>
                    <div className="form-group">
                        <label>{getTranslation().invitation.copyAndSendToX} <b><u>{recipient}</u></b>.</label>
                        <input
                            readOnly
                            className="form-control bg-dark text-white"
                            value={buildInvitationUrl()} />
                    </div>

                    <NavLink to="/" className="btn btn-theme mr-3">{getTranslation().done}</NavLink>
                    <button className="btn btn-outline-theme mr-3" onClick={() => setIsDone(false)}>{getTranslation().cancel}</button>
                </>
            ) : (
                    <>
                        <div className="form-group">
                            <label>{getTranslation().invitation.yourName}</label>
                            <input
                                className="form-control bg-dark text-white"
                                onChange={(event) => setSender(event.target.value)}
                                value={sender} />
                        </div>
                        <div className="form-group">
                            <label>{getTranslation().invitation.recipientsName}</label>
                            <input
                                className="form-control bg-dark text-white"
                                onChange={(event) => setRecipient(event.target.value)}
                                value={recipient} />
                        </div>

                        <button disabled={!isFormValid()} className="btn btn-theme mr-3" onClick={() => setIsDone(true)}>{getTranslation().continue}</button>
                        <NavLink to="/setup" className="btn btn-outline-theme">{getTranslation().cancel}</NavLink>
                    </>
                )}

        </div>
    );
});
