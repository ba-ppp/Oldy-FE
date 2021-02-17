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
    data: string
}

type AxiosResponse = {
    data: ServerData
}



const register = ({ email, name, password, username }: props) => {
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
                resolve(data.data);
            } else {
                // FAIL
                reject(response);
            }
        })
        .catch((e) => {
          console.error(`login fail: ${e}`);
          reject(e);
        });
    });
  };

export default register;