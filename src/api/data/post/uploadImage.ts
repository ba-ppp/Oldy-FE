import Environment from 'api/env/post';
import axios from 'axios';

export interface PromiseRespone {
    message: string;
    url?: string;
}

type ServerData = {
    errorCode: number;
    message: string;
    url: string;
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
    const url = Environment.getUpImagePoint();
    return new Promise((resolve, reject) => {
        axios
            .post(url, data, config)
            .then((response: AxiosResponse) => {
                const dataResponse = response.data;
                let result: PromiseRespone;
                if (dataResponse.errorCode === 0) {
                    result = {
                        message: dataResponse.message,
                        url: dataResponse.url,
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
