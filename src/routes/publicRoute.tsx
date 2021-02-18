import { Route } from "react-router-dom";
import React from 'react';

type Props = {
    path: string,
    exact: boolean,
    component: React.FC
}

const publicRoute:React.FC<Props> = (props) => {
    const {path, exact, component} = props;
    const Component = component;

    return(
        <Route
            path={path}
            exact={exact}
            render={() => <Component />}
        />
    )
}
export default publicRoute;
