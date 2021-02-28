import Environment from 'api/env';
import axios from 'axios';

type Props = {
    account: string;
};

export type ServerData = {
    code: string;
    errorCode: number;
    token: string;
};

interface PromiseResponse {
    code?: string;
    token?: string;
    error?: string;
}

type AxiosResponse = {
    data: ServerData;
};

const forgot = ({ account }: Props): Promise<PromiseResponse> => {
    const data = {
        account,
    };
    const url = Environment.getForgotEndPoint();

    return new Promise((resolve, reject) => {
        axios
            .post(url, data)
            .then((response: AxiosResponse) => {
                const dataResponse = response.data;
                if (dataResponse.errorCode === 0) {
                    resolve({
                        code: dataResponse.code,
                        token: dataResponse.token,
                    });
                }
                resolve({ error: 'Server has downed' });
            })
            .catch((e: any) => {
                reject(e);
            });
    });
};

export default forgot;
