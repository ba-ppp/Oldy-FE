import Environment from 'api/env/post';
import axios from 'axios';

export interface PromiseResponse {
    posts: Array<ArrayPost>;
}

type Post = {
    like: Array<string>;
    comment?: string | null;
    share: Array<string>;
    id: string;
    userId: string;
    caption: string;
    image: string;
};

type UserPost = {
    username: string;
    avt: string;
};

export interface ArrayPost {
    post: Post;
    user: UserPost;
}

type ServerData = {
    errorCode: number;
    posts: Array<ArrayPost>;
};

type AxiosResponse = {
    data: ServerData;
};

const getPost = (): Promise<PromiseResponse> => {
    const url = Environment.getPostpoint();

    return new Promise((resolve, reject) => {
        axios
            .get(url)
            .then((response: AxiosResponse) => {
                const dataResponse = response.data;
                if (dataResponse.errorCode === 0) {
                    const result = {
                        posts: dataResponse.posts,
                    };
                    resolve(result);
                }
            })
            .catch((e: any) => {
                reject(e);
            });
    });
};

export default getPost;
