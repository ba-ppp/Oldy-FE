import ChangeForget from 'components/ChangePassword/changeForget';
import Loading from 'components/Loading';
import React, { lazy, Suspense } from 'react';
import { BrowserRouter, Switch } from 'react-router-dom';
import PrivateRoute from './privateRoute';
import PublicRoute from './publicRoute';

const Login = lazy(() => import('components/Login'));
const Register = lazy(() => import('components/Register'));
const Forget = lazy(() => import('components/ForgetPass'));
const InputCode = lazy(() => import('components/ForgetPass/inputCode'));
const Home = lazy(() => import('components/Home'));
const Profile = lazy(() => import('components/Profile'));

const Routes: React.FC = () => (
    <Suspense fallback={<Loading />}>
        <BrowserRouter>
            <Switch>
                <PublicRoute path="/register" exact component={Register} />
                <PublicRoute path="/login" exact component={Login} />
                <PublicRoute
                    path="/forget-password/input-code"
                    exact
                    component={InputCode}
                />
                <PublicRoute path="/forget-password" exact component={Forget} />

                <PrivateRoute path="/" exact component={Home} />
                <PrivateRoute
                    path="/change-password"
                    exact
                    component={ChangeForget}
                />
                <PrivateRoute path="/profile" exact component={Profile} />
            </Switch>
        </BrowserRouter>
    </Suspense>
);

export default Routes;
