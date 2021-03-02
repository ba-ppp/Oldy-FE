import Header from 'components/Header';
import React, { useEffect, useState } from 'react';
import cls from './_home.module.scss';
// import Post from './Post';
import { ReactComponent as HomeIcon } from 'assets/images/home/home.svg';
import { ReactComponent as FindIcon } from 'assets/images/home/find.svg';
import { ReactComponent as AddIcon } from 'assets/images/home/add.svg';
import { ReactComponent as HeartIcon } from 'assets/images/home/heart.svg';
import { useSelector } from 'app/reducers/type';
import getPost from 'api/data/post/post';
import { PromiseResponse } from 'api/auth/refreshToken';

const Home: React.FC = () => {
    const state = useSelector((state) => state.profile);
    const avt = state.avt;
    const [post, setPost] = useState<PromiseResponse | any>(null);

    useEffect(() => {
        async function fetchData() {
            const data = await getPost();
            setPost(data);
            console.log(data);
        }
        fetchData();
    }, []);
    return (
        <div>
            <Header avt={avt} />
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
                    {/* {arr.map(function (i, key) {
                        return <Post  key={key} />;
                    })} */}
                </div>
                <div className={cls.footer}>
                    <div className={cls.nav}>
                        <HomeIcon
                            height={25}
                            width={25}
                            className={cls.nav_icon}
                        />
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
                        <div
                            className={cls.nav_icon_avt}
                            style={{ backgroundImage: `url(${avt})` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
