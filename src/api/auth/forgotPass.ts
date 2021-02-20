import Environment from 'api/env';
import axios from 'axios';

type Props = {
    email: string;
};

export type ServerData = {
    code: string;
};

type AxiosResponse = {
    data: ServerData;
};

const forgot = ({ email }: Props): Promise<ServerData> => {
    const data = {
        email,
    };
    const url = Environment.getForgotEndPoint();

    return new Promise((resolve, reject) => {
        axios
            .post(url, data)
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

export default forgot;
