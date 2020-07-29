import React from "react";
import { Route, Redirect } from "react-router-dom";

function PublicRoute({ component: Component, authenticated, ...rest }) {
  return (
    <Route
      {...rest}
      render={(props) =>
        authenticated === false ? (
          <Component {...props}></Component>
        ) : (
          <Redirect to="/chat"></Redirect>
        )
      }
    ></Route>
  );
}

export default PublicRoute;
