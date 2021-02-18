import Environment from "api/env";
import axios from "axios";

type props = {
  username: string, 
  password: string
}

type ServerData = {
  token: string,
  errorCode: number,
  firstLogin: boolean,
  name: string,
  email: string
}

type AxiosResponse = {
  data: ServerData
}


const login = async ({ username, password }: props): Promise<ServerData> => {
  const data = {
    username,
    password,
  };

  const url = Environment.getLoginEndpoint();

  return new Promise((resolve, reject) => {
    axios.post(url, data)
      .then((response: AxiosResponse) => {
        const data = response.data;
        resolve(data);
      })
      .catch((e: any) => {
        console.error(`login fail: ${e}`);
        reject(e);
      });
  });
};

export default login;