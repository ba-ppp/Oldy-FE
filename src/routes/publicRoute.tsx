import { Route } from 'react-router-dom';
import React from 'react';
import PropTypes from 'prop-types';

type Props = {
    path: string;
    exact: boolean;
    component: React.FC;
};

const PublicRoute: React.FC<Props> = (props) => {
    const { path, exact, component } = props;

    return <Route path={path} exact={exact} component={component} />;
};

PublicRoute.propTypes = {
    path: PropTypes.string.isRequired,
    exact: PropTypes.bool.isRequired,
    component: PropTypes.any.isRequired,
};

export default PublicRoute;
