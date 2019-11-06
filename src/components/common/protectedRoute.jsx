import React from "react";
import { Route, Redirect } from "react-router-dom";
import { getCurrentUser } from "../../services/authService";
const ProtectedRoute = ({ component: Component, render, rule, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => {
        if (!getCurrentUser() || (getCurrentUser() && !getCurrentUser()[rule]))
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    ></Route>
  );
};

export default ProtectedRoute;
