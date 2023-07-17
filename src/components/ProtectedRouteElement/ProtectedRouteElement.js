import React from "react";
import { Navigate } from "react-router-dom";
import { PATHS } from "../../utils/config";

const ProtectedRouteElement = ({ element: Component, ...props }) => {
    return (
        props.loggedIn ? <Component {...props} /> : <Navigate to={PATHS.main} replace />
    )
}

export default ProtectedRouteElement; 