import React from "react";
import { Route, Redirect, useLocation } from "react-router-dom";

function PublicRoute({ component: Component, authenticated, ...rest }) {
  const location = useLocation();
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === false ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to={location.state ? location.state.from : "/"}></Redirect>
        )
      }
    ></Route>
  );
}

export default PublicRoute;
