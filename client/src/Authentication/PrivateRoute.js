import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAppState } from "../state";
import { Switch } from "@material-ui/core";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { getTeacher } = useAppState();

  return (
    <Route
      {...rest}
      render={(props) =>
        getTeacher() ? <Component {...props} /> : <Redirect to="/login" />
      }
    />
  );
};

export default PrivateRoute;
