import React from "react";
import { GoLightBulb } from "react-icons/go";
import { connect, ConnectedProps } from "react-redux";
import { NavLink, RouteComponentProps } from "react-router-dom";
import { getTranslation } from "../localization";
import { ApplicationState } from "../stores";
import { settingsActionCreators } from "../stores/Settings/actionCreators";
import { SettingsState } from "../stores/Settings/state";

const mapStateToProps = (state: ApplicationState) => ({ ...state.settings });

const connector = connect(mapStateToProps, settingsActionCreators);

type InvitationProps =
    ConnectedProps<typeof connector> &
    SettingsState &
    RouteComponentProps<{ lifxApiKey: string, to: string, from: string }>;

export const Invitation = connector((props: InvitationProps) => {
    props.saveLifxApiKey(props.match.params.lifxApiKey);
    const to = atob(props.match.params.to);
    const from = atob(props.match.params.from);

    return (
        <div className="bg-base rounded-lg shadow-sm p-3 text-center">
            <h3 className="font-weight-light text-warning"><GoLightBulb className="mt-n1" /> {getTranslation().invitation.congratulations} <b><u>{to}</u></b>!</h3>
            <hr className="border-warning" />
            <p className="my-5"><b><u>{from}</u></b> {getTranslation().invitation.xHasGrantedAccess}</p>
            <NavLink to="/" className="btn btn-outline-theme">{getTranslation().continue}</NavLink>
        </div>
    );
});
