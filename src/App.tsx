import 'bootstrap/dist/css/bootstrap.min.css';
import React from "react";
import { GoGear } from 'react-icons/go';
import { Provider } from "react-redux";
import { HashRouter as Router, NavLink, Route, Switch } from "react-router-dom";
import { Home } from "./components/Home";
import { Invitation } from './components/Invitation';
import { Invite } from './components/Invite';
import { NotFound } from "./components/NotFound";
import { Setup } from './components/Setup';
import { createApplicationStore } from './stores';
import { getTranslation } from "./localization";

const store = createApplicationStore();

export const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <div className="bg-base text-white py-2 shadow">
                    <div className="container-xl">
                        <div className="row">
                            <div className="col-4"></div>
                            <div className="col-4 text-center">
                                <h3 className="mb-0">
                                    <NavLink exact className="text-white text-decoration-none" to="/">{getTranslation().applicationName}</NavLink>
                                </h3>
                            </div>
                            <div className="col-4 text-right">
                                <h4 className="mb-0">
                                    <NavLink className="text-secondary" activeClassName="text-theme" to="/setup">
                                        <GoGear className="mt-n1" />
                                    </NavLink>
                                </h4>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-xl py-3">
                    <Switch>
                        <Route path="/" exact component={Home} />
                        <Route path="/setup/invite" component={Invite} />
                        <Route path="/setup" component={Setup} />
                        <Route path="/invitation/:lifxApiKey/:to/:from" component={Invitation} />
                        <Route path="*" component={NotFound} />
                    </Switch>
                </div>
            </Router >
        </Provider>
    )
}
