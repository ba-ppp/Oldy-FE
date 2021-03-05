import Environment from 'api/env/post';
import axios from 'axios';

type Props = {
    userId: string;
};

export interface PromiseResponse {
    posts: Array<ArrayPost>;
}

type Post = {
    likes: Array<string>;
    liked: boolean;
    comment?: string | null;
    share: Array<string>;
    _id: string;
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

const getPost = ({ userId }: Props): Promise<PromiseResponse> => {
    const data = { userId };
    const url = Environment.getPostpoint();

    return new Promise((resolve, reject) => {
        axios
            .post(url, data)
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
