import { Register } from "components";
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import PrivateRoute from "./privateRoute";
import PublicRoute from "./publicRoute";



const Routes = () => {
  return (
      <BrowserRouter>
        <Switch>
          <PrivateRoute path= '/'/>

          <PublicRoute path='/register' exact component={Register}/>
        </Switch>
      </BrowserRouter>
    );
};

export default Routes;
