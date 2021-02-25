import React from 'react';
import Header from 'components/Header';
import cls from './_home.module.scss';
import { ReactComponent as Heart } from 'assets/images/home/heart.svg';
import { ReactComponent as Comment } from 'assets/images/home/comment.svg';

const Home: React.FC = () => {
    const postImage = 'https://loremflickr.com/650/614';
    const avtHeader = 'https://loremflickr.com/320/240';

    const userName = 'pebeoooo';

    return (
        <div>
            <Header />
            <div className={cls.home_main}>
                <div className={cls.home_post}>
                    <header className={cls.home_post_header}>
                        <div
                            className={cls.header_avt}
                            style={{ backgroundImage: `url(${avtHeader})` }}
                        />
                        <div className={cls.header_username}>{userName}</div>
                    </header>
                    <div
                        className={cls.home_post_image}
                        style={{ backgroundImage: `url(${postImage})` }}
                    />
                    <div className={cls.home_post_comment}>
                        <Heart
                            className={cls.home_post_comment_icon}
                            height={25}
                            width={25}
                        />
                        <Comment
                            className={cls.home_post_comment_icon}
                            height={25}
                            width={25}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
