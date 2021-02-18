import Environment from "api/env";
import axios from "axios";

type props = {
  email: string, 
  name: string,
  password: string,
  username: string
}

type ServerData = {
  errorCode: number
  username: string,
  email: string,
  name: string
}

type AxiosResponse = {
  data: ServerData
}



const register = ({ email, name, password, username }: props): Promise<ServerData> => {
  const data = {
    email,
    password,
    name,
    username,
  };

  const url = Environment.getRegistrationEndPoint();

  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then((response: AxiosResponse) => {
          const data = response.data;
          if (data.errorCode === 0) {
              // SUCCESS
              resolve(data);
          } else {
              // FAIL
              reject(response);
          }
      })
      .catch((e: any) => {
        console.error(`login fail: ${e}`);
        reject(e);
      });
  });
};

export default register;