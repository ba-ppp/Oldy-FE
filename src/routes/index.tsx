import { Home, Login, Register } from "components";
import Forget from "components/ForgetPass";
import InputCode from "components/ForgetPass/inputCode";
import React from "react";
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
          

            <PrivateRoute path='/' exact component={Home} /> 
        </Switch>
    </BrowserRouter>
);


export default Routes;
