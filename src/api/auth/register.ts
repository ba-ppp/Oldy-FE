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
    error: string;
};

type AxiosResponse = {
    data: ServerData;
};

const register = ({
    email,
    name,
    password,
    username,
}: Props): Promise<ServerData> => {
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
                    resolve(dataResponse);
                    return null;
                }

                // FAIL
                reject(dataResponse.error);
                return null;
            })
            .catch((e: unknown) => {
                reject(e);
            });
    });
};

export default register;
