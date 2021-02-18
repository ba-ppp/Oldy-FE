import Environment from "api/env";
import axios from "axios";

type Props = {
  username: string, 
  password: string
}

type ServerData = {
  token: string,
  errorCode: number,
  name: string,
  email: string,
  username: string
}

type AxiosResponse = {
  data: ServerData
}


const login = async ({ username, password }: Props): Promise<ServerData> => {
    const data = {
        username,
        password,
    };

    const url = Environment.getLoginEndpoint();

    return new Promise((resolve, reject) => {
        axios.post(url, data)
            .then((response: AxiosResponse) => {
                const dataResponse = response.data;
                resolve(dataResponse);
                return null;
            })
            .catch((e: unknown) => {
                reject(e);
            });
    });
};

export default login;