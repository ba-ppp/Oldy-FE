import Header from 'components/Header';
import React from 'react';
import cls from './_home.module.scss';
import Post from './Post';

const Home: React.FC = () => {
    return (
        <div>
            <Header />
            <div className={cls.main}>
                <div className={cls.post}>
                    <Post />
                    <Post />
                </div>
                <div className={cls.nav}>hi</div>
            </div>
        </div>
    );
};

export default Home;
