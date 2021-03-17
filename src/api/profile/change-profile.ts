import Environment from 'api/env/profile';
import axios from 'axios';

type Props = {
    name: string;
    email: string;
    id: string;
};

export interface PromiseRespone {
    errorCode: number;
    message: string;
}

type ServerData = {
    errorCode: number;
    message: string;
};

type AxiosResponse = {
    data: ServerData;
};

const changeProfile = ({ name, email, id }: Props): Promise<PromiseRespone> => {
    const data = { name, email, id };
    const url = Environment.getChangeProfile();
    return new Promise((resolve, reject) => {
        axios
            .post(url, data)
            .then((response: AxiosResponse) => {
                const dataResponse = response.data;
                console.log(dataResponse);
                const result = {
                    message: dataResponse.message,
                    errorCode: dataResponse.errorCode,
                };
                resolve(result);
            })
            .catch((e: any) => {
                reject(e);
            });
    });
};

export default changeProfile;
