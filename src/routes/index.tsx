import { Login, Register } from "components";
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import PrivateRoute from "./privateRoute";
import PublicRoute from "./publicRoute";



const Routes = () => {
  return (
      <BrowserRouter>
        <Switch>
          <PublicRoute path='/register' exact component={Register}/>
          <PublicRoute path='/login' exact component={Login}/>


          <PrivateRoute path= '/'/> 
        </Switch>
      </BrowserRouter>
    );
};

export default Routes;
