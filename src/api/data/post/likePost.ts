import Environment from 'api/env/post';
import axios from 'axios';

export interface PromiseResponse {
    error: string;
}

type Props = {
    userId: string;
    postId: string;
};

type ServerData = {
    errorCode: number;
};

type AxiosResponse = {
    data: ServerData;
};

const likePost = ({ userId, postId }: Props): Promise<PromiseResponse> => {
    const url = Environment.getLikePostPoint();
    const data = {
        userId,
        postId,
    };
    return new Promise((resolve, reject) => {
        axios
            .post(url, data)
            .then((response: AxiosResponse) => {
                const dataResponse = response.data;
                if (dataResponse.errorCode === 0) {
                    const result = {
                        error: '',
                    };
                    resolve(result);
                }
            })
            .catch((e: any) => {
                reject(e);
            });
    });
};

export default likePost;
