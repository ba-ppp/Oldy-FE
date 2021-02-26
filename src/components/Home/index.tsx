import Header from 'components/Header';
import React from 'react';
import cls from './_home.module.scss';
import Post from './Post';

const Home: React.FC = () => {
    const userName = 'pebeooo';
    const name = 'Gia Bảo';
    const userAvt = 'https://loremflickr.com/320/240';
    return (
        <div>
            <div className={cls.header}>
                <Header />
            </div>
            <div className={cls.main}>
                <div className={cls.post}>
                    <Post />
                    <Post />
                </div>
                <div className={cls.avt}>
                    <div
                        className={cls.avt_image}
                        style={{ backgroundImage: `url(${userAvt})` }}
                    />
                    <div className={cls.avt_name}>
                        <div>
                            <div className={cls.avt_name_username}>
                                {userName}
                            </div>
                            <div className={cls.avt_name_name}>{name}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
