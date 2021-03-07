import { useSelector } from 'app/reducers/type';
import Header from 'components/Header';
import cls from './_profile.module.scss';
import React from 'react';

const Profile: React.FC = () => {
    const state = useSelector((state) => state.profile);
    const avt = state.avt;
    const { name, username, email } = state;

    return (
        <div>
            <Header
                avt={avt}
                exploreClick={false}
                homeClick={false}
                heartClick={false}
                messClick={false}
                style={{ position: 'unset' }}
            />
            <div className={cls.main}>
                <div className={cls.compo}>
                    <div className={cls.label}>Tên:&nbsp;</div>
                    <input className={cls.input} value={name} />
                </div>
                <div className={cls.compo}>
                    <div className={cls.label}>Tên người dùng:&nbsp;</div>
                    <input className={cls.input} value={username} />
                </div>
                <div className={cls.compo}>
                    <div className={cls.label}>Email:&nbsp;</div>
                    <input className={cls.input} value={email} />
                </div>
                <div className={cls.compo}>
                    <div className={cls.label}>Số điện thoại:&nbsp;</div>
                    <input placeholder="0123456789" />
                </div>
            </div>
        </div>
    );
};

export default Profile;
