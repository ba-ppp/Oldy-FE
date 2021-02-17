import Environment from "api/env";
import axios from "axios";

type props = {
    username: string, 
    password: string
}

const login = async ({ username, password }: props) => {
  const data = {
    username,
    password,
  };

  const url = Environment.getLoginEndpoint();

  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then((response) => {
        resolve(response);
      })
      .catch((e) => {
        console.error(`login fail: ${e}`);
        reject(e);
      });
  });
};

export default login;