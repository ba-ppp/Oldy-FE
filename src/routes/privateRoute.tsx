import { Route, Redirect } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import jwt from 'jsonwebtoken';
import PropTypes from 'prop-types';
import { refreshToken } from 'api/auth';

type Props = {
    component: React.FC;
    path: string;
    exact: boolean;
};

type Decode = {
    exp: number;
    _id: string;
    message: any;
};

const PrivateRoute: React.FC<Props> = (props) => {
    const { path, exact, component } = props;
    const Component = component;
    const [checkToken, setcheckToken] = useState(false); // check if token wrong

    const token = window.localStorage.getItem('token'); // set token at here
    useEffect(() => {
        if (token) {
            const decode: Decode | any = jwt.decode(token);
            if (!decode) {
                window.localStorage.removeItem('token');
                setcheckToken(true);
                return;
            }
            const { exp } = decode;

            const now = Math.floor(Date.now() / 1000);

            // if expired
            if (exp - now <= 0) {
                // get new token by refreshtoken
                const data = {
                    id: decode._id,
                };
                refreshToken(data).then((value) => {
                    if (value.error || !value.token) {
                        // error when get token
                        console.log(value);
                        window.localStorage.removeItem('token');
                        setcheckToken(true);
                        return;
                    } else {
                        window.localStorage.setItem('token', value.token);
                    }
                });
            }
        }
    }, [token]);

    return (
        <Route
            path={path}
            exact={exact}
            render={() => {
                if (!token || checkToken) {
                    return <Redirect to={{ pathname: '/login' }} />;
                }
                return <Component />;
            }}
        />
    );
};

PrivateRoute.propTypes = {
    path: PropTypes.string.isRequired,
    exact: PropTypes.bool.isRequired,
    component: PropTypes.any.isRequired,
};

export default PrivateRoute;
