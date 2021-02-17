import { Route } from "react-router-dom";
import React from "react";

const publicRoute = ({ Component, ...rest }: any) => {
  return (
    <Route
      {...rest}
      render={(props) => {
        return <Component {...props} />;
      }}
    />
  );
};

export default publicRoute;
