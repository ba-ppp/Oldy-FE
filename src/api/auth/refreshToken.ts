import Environment from 'api/env';
import axios from 'axios';

type Props = {
    id: string;
};

export interface PromiseResponse {
    token?: string;
    error?: string;
}

type ServerData = {
    token: string;
    errorCode: number;
    error: string;
};

type AxiosResponse = {
    data: ServerData;
};

const refreshToken = async ({ id }: Props): Promise<PromiseResponse> => {
    const data = {
        id,
    };

    const url = Environment.getRefreshTokenPoint();

    return new Promise((resolve, reject) => {
        axios
            .post(url, data)
            .then((response: AxiosResponse) => {
                const dataResponse = response.data;
                if (dataResponse.errorCode === 0) {
                    const { token } = dataResponse;
                    resolve({ token: token });
                }
                resolve({ error: dataResponse.error });
            })
            .catch((e: any) => {
                reject(e);
            });
    });
};

export default refreshToken;
