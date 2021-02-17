import { Route, Redirect } from "react-router-dom";
import React from "react";
import jwt from "jsonwebtoken";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";


const PrivateRoute = ({component: Component , ...rest }: any) => {
  const [checkToken, setcheckToken] = useState(false); // check if token wrong

  let token = window.localStorage.getItem("token"); //set token at here
  useEffect(() => {
    if (token) {
      const decode:any = jwt.decode(token);

      if (!decode) {
        window.localStorage.removeItem("token");
        setcheckToken(true);
        return;
      }
      const exp = decode.exp;

      const now = Math.floor(Date.now() / 1000);

      // if expired
      if (exp - now <= 0) {
        // get new token by refreshtoken
        const id = decode._id;

        axios
          .post(process.env["NODE_ENV"], { id: id })
          .then((res) => {
            const data = res.data;
            if (data.err) {
              // if refreshToken expired
              window.localStorage.removeItem("token");
              token = null;
            } else {
              let newToken = data.token;
              window.localStorage.setItem("token", newToken);
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    }
  });
  
  return (
      <Route
        {...rest}
        render={() => {
          if (!token || checkToken) {
            return <Redirect to={{ pathname: "/login" }} />;
          }
          return <Component />;
        }}
      />
    );
};


export default PrivateRoute;
