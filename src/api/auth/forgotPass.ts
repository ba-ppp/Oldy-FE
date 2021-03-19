import Environment from 'api/env/auth';
import axios from 'axios';

type Props = {
    account: string;
};

export type ServerData = {
    avt?: string;
    code?: string;
    email?: string;
    error?: string;
    errorCode: number;
    token?: string;
    id?: string;
    name?: string;
    username?: string;
};

interface PromiseResponse {
    avt?: string;
    code?: string;
    email?: string;
    error?: string;
    token?: string;
    id?: string;
    name?: string;
    username?: string;
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
                        avt: dataResponse.avt,
                        code: dataResponse.code,
                        email: dataResponse.email,
                        error: dataResponse.error,
                        token: dataResponse.token,
                        id: dataResponse.id,
                        name: dataResponse.name,
                        username: dataResponse.username,
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
