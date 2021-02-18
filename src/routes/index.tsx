import { Login, Register } from "components";
import Forget from "components/ForgetPass";
import InputCode from "components/ForgetPass/inputCode";
import React, { Suspense, lazy } from "react";
import { BrowserRouter, Switch } from "react-router-dom";
import PrivateRoute from "./privateRoute";
import PublicRoute from "./publicRoute";



const Routes: React.FC = () => (
    <BrowserRouter>
        <Switch>
            <PublicRoute path='/register' exact component={Register} />
            <PublicRoute path='/login' exact component={Login} />
            <PublicRoute path='/forget-password/input-code' exact component={InputCode} />
            <PublicRoute path='/forget-password' exact component={Forget} />
          

            <PrivateRoute path='/' exact component={Login} /> 
        </Switch>
    </BrowserRouter>
);


export default Routes;
