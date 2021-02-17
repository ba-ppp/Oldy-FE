import { Route } from "react-router-dom";


const publicRoute = ({ component : Component, ...rest }: any) => {
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
