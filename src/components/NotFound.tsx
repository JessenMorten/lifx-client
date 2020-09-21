import React from "react";
import { GoStop } from "react-icons/go";
import { NavLink } from "react-router-dom";
import { getTranslation } from "../localization";

export const NotFound = () => {
    return (
        <div className="bg-base rounded-lg shadow-sm p-3 text-center">
            <h3 className="font-weight-light text-warning"><GoStop className="mt-n1" /> {getTranslation().notFound.oops}</h3>
            <hr className="border-warning" />
            <p>{getTranslation().notFound.thePageCouldNotBeFound}</p>
            <NavLink to="/" className="btn btn-outline-theme">{getTranslation().notFound.goToTheHomePage}</NavLink>
        </div>
    );
};
