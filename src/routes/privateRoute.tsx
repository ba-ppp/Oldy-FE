import { Route, Redirect } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import jwt_decode from 'jwt-decode';
import PropTypes from 'prop-types';

type Props = {
    component: React.FC;
    path: string;
    exact: boolean;
};

type Decode = {
    exp: number;
    id: string;
};

const PrivateRoute: React.FC<Props> = (props) => {
    const { path, exact, component } = props;
    const Component = component;
    const [checkToken, setcheckToken] = useState(false); // check if token wrong

    const token = window.localStorage.getItem('token'); // set token at here
    useEffect(() => {
        if (token) {
            const decode: Decode | null = jwt_decode(token);
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
                // const {id} = decode;
                // axios
                //     .post(process.env["NODE_ENV"], { id: id })
                //     .then((res) => {
                //         const data = res.data;
                //             if (data.err) {
                //               // if refreshToken expired
                //               window.localStorage.removeItem("token");
                //               token = null;
                //             } else {
                //               let newToken = data.token;
                //               window.localStorage.setItem("token", newToken);
                //             }
                //     })
                //     .catch((err) => {
                //       console.log(err);
                //     });
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
