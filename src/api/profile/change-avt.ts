import Environment from 'api/env/profile';
import axios from 'axios';

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

const changeAvt = (data: FormData): Promise<PromiseRespone> => {
    const config = {
        headers: {
            'content-type': 'multipart/form-data',
        },
    };
    const url = Environment.getChangeAvt();
    return new Promise((resolve, reject) => {
        axios
            .post(url, data, config)
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

export default changeAvt;
