import Header from 'components/Header';
import React from 'react';
import cls from './_home.module.scss';
import Post from './Post';
import { ReactComponent as HomeIcon } from 'assets/images/home/home.svg';
import { ReactComponent as FindIcon } from 'assets/images/home/find.svg';
import { ReactComponent as AddIcon } from 'assets/images/home/add.svg';
import { ReactComponent as HeartIcon } from 'assets/images/home/heart.svg';

const Home: React.FC = () => {
    const backGround = 'https://loremflickr.com/320/240';

    return (
        <div>
            <Header />
            <div className={cls.main}>
                <div className={cls.post}>
                    <div className={cls.create_post}>
                        <div
                            className={cls.create_post_avt}
                            style={{ backgroundImage: `url(${backGround})` }}
                        />
                        <input
                            className={cls.create_post_input}
                            placeholder="Bạn đang nghĩ gì vậy?"
                        />
                    </div>
                    <Post />
                    <Post />
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
                            style={{ backgroundImage: `url(${backGround})` }}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
