import React from "react";
import { Navigate } from "react-router-dom";
import { paths } from "../../utils/config"

const ProtectedRouteElement = ({ element: Component, ...props }) => {
    return (
        props.loggedIn ? <Component {...props} /> : <Navigate to={paths.signIn} replace />
    )
}

export default ProtectedRouteElement; 