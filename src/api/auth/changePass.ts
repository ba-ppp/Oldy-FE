import Environment from 'api/env';
import axios from 'axios';

type Props = {
    password: string;
    username: string;
};

export type ServerData = {
    errorCode: number;
};

interface PromiseResponse {
    error?: string;
}

type AxiosResponse = {
    data: ServerData;
};

const changePassword = ({
    password,
    username,
}: Props): Promise<PromiseResponse> => {
    const data = {
        password,
        username,
    };
    const url = Environment.getChangePasswordEndPoint();

    return new Promise((resolve, reject) => {
        axios
            .post(url, data)
            .then((response: AxiosResponse) => {
                const dataResponse = response.data;
                if (dataResponse.errorCode === 0) {
                    resolve({
                        error: '',
                    });
                }
                resolve({ error: 'Server has downed' });
            })
            .catch((e: any) => {
                reject(e);
            });
    });
};

export default changePassword;
