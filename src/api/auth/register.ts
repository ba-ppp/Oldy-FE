import Environment from 'api/env';
import axios from 'axios';

type Props = {
    email: string;
    name: string;
    password: string;
    username: string;
};

type ServerData = {
    errorCode: number;
    username: string;
    email: string;
    name: string;
    token: string;
    error: string;
};

type AxiosResponse = {
    data: ServerData;
};

interface PromiseResponse {
    token?: string;
    name?: string;
    username?: string;
    email?: string;
    error?: string;
}

const register = ({
    email,
    name,
    password,
    username,
}: Props): Promise<PromiseResponse> => {
    const data = {
        email,
        password,
        name,
        username,
    };

    const url = Environment.getRegistrationEndPoint();

    return new Promise((resolve, reject) => {
        axios
            .post(url, data)
            .then((response: AxiosResponse) => {
                const dataResponse = response.data;
                if (dataResponse.errorCode === 0) {
                    // SUCCESS
                    const profile = {
                        username: dataResponse.username,
                        name: dataResponse.name,
                        email: dataResponse.email,
                        token: dataResponse.token,
                    };
                    resolve(profile);
                }
                // FAIL
                resolve({ error: dataResponse.error });
            })
            .catch((e: any) => {
                reject(e);
            });
    });
};

export default register;
