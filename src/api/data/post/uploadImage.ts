import Environment from 'api/env/profile';
import axios from 'axios';

export interface PromiseRespone {
    message: string;
}

type ServerData = {
    errorCode: number;
    message: string;
};

type AxiosResponse = {
    data: ServerData;
};

const uploadImage = (data: FormData): Promise<PromiseRespone> => {
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
                let result: PromiseRespone;
                if (dataResponse.errorCode === 0) {
                    result = {
                        message: dataResponse.message,
                    };
                } else {
                    result = {
                        message: dataResponse.message,
                    };
                }
                resolve(result);
            })
            .catch((e: any) => {
                reject(e);
            });
    });
};

export default uploadImage;
