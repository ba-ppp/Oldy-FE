import Header from 'components/Header';
import React, { useEffect, useState } from 'react';
import cls from './_home.module.scss';
import Post from './Post';
import { ReactComponent as HomeIcon } from 'assets/images/home/home.svg';
import { ReactComponent as FindIcon } from 'assets/images/home/find.svg';
import { ReactComponent as AddIcon } from 'assets/images/home/add.svg';
import { ReactComponent as HeartIcon } from 'assets/images/home/heart.svg';
import { useSelector } from 'app/reducers/type';
import getPost, { ArrayPost } from 'api/data/post/post';
import { PromiseResponse } from 'api/data/post/post';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
    const state = useSelector((state) => state.profile);
    const avt = state.avt;
    const userId = state.id;
    const [posts, setPosts] = useState<PromiseResponse | any>(null);

    useEffect(() => {
        async function fetchData() {
            const data = await getPost({ userId });
            setPosts(data.posts);
        }
        fetchData();
    }, []);
    return (
        <div>
            <Header
                avt={avt}
                exploreClick={false}
                heartClick={false}
                homeClick={true}
                messClick={false}
            />
            <div className={cls.main}>
                <div className={cls.post}>
                    <div className={cls.create_post}>
                        <div
                            className={cls.create_post_avt}
                            style={{ backgroundImage: `url(${avt})` }}
                        />
                        <input
                            className={cls.create_post_input}
                            placeholder="Bạn đang nghĩ gì vậy?"
                        />
                    </div>
                    {posts &&
                        posts.map(function (post: ArrayPost, key: number) {
                            return (
                                <Post
                                    postId={post.post._id}
                                    avtHeader={post.user.avt}
                                    postImage={post.post.image}
                                    likeCount={
                                        post.post.likes
                                            ? post.post.likes.length
                                            : 0
                                    }
                                    liked={post.post.liked}
                                    userName={post.user.username}
                                    commentCount={
                                        post.post.comment
                                            ? post.post.comment.length
                                            : 0
                                    }
                                    shareCount={
                                        post.post.share
                                            ? post.post.share.length
                                            : 0
                                    }
                                    key={key}
                                />
                            );
                        })}
                </div>
                <div className={cls.footer}>
                    <div className={cls.nav}>
                        <Link to="/">
                            <HomeIcon
                                height={25}
                                width={25}
                                className={cls.nav_icon}
                            />
                        </Link>
                        <FindIcon
                            width={25}
                            height={25}
                            className={cls.nav_icon}
                        />
                        <AddIcon
                            width={25}
                            height={25}
                            className={cls.nav_icon}
                        />
                        <HeartIcon
                            width={25}
                            height={25}
                            className={cls.nav_icon}
                        />
                        <Link to="/profile">
                            <div
                                className={cls.nav_icon_avt}
                                style={{ backgroundImage: `url(${avt})` }}
                            />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
