import Environment from 'api/env';
import axios from 'axios';

type Props = {
    username: string;
    password: string;
};

export interface PromiseResponse {
    token?: string;
    name?: string;
    username?: string;
    email?: string;
    error?: string;
}

type ServerData = {
    token: string;
    errorCode: number;
    name: string;
    email: string;
    username: string;
    error: string;
};

type AxiosResponse = {
    data: ServerData;
};

const login = async ({
    username,
    password,
}: Props): Promise<PromiseResponse> => {
    const data = {
        username,
        password,
    };

    const url = Environment.getLoginEndpoint();

    return new Promise((resolve, reject) => {
        axios
            .post(url, data)
            .then((response: AxiosResponse) => {
                const dataResponse = response.data;
                if (dataResponse.errorCode === 0) {
                    const profile = {
                        email: dataResponse.email,
                        name: dataResponse.name,
                        username: dataResponse.username,
                        token: dataResponse.token,
                    };
                    resolve(profile);
                }
                resolve({ error: dataResponse.error });
            })
            .catch((e: any) => {
                reject(e);
            });
    });
};

export default login;
