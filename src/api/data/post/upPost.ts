import Environment from 'api/env/post';
import axios from 'axios';

type Props = {
    userId: string;
    caption: string;
    images: string;
};

type PromiseResponse = {
    message: string;
};

type ServerData = {
    message: string;
    errorCode: number;
};

type AxiosResponse = {
    data: ServerData;
};

const upPost = ({
    userId,
    caption,
    images,
}: Props): Promise<PromiseResponse> => {
    const data = { userId, caption, images };
    const url = Environment.getUpPostPoint();

    return new Promise((resolve, reject) => {
        axios
            .post(url, data)
            .then((response: AxiosResponse) => {
                const dataResponse = response.data;
                if (dataResponse.errorCode === 0) {
                    const result = {
                        message: dataResponse.message,
                    };
                    resolve(result);
                }
            })
            .catch((e: any) => {
                reject(e);
            });
    });
};

export default upPost;
