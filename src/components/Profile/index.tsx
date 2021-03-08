import { useSelector } from 'app/reducers/type';
import Header from 'components/Header';
import cls from './_profile.module.scss';
import React from 'react';
import { Button } from 'antd';

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
                <div className={cls.compo_avt}>
                    <div className={cls.avt_width}>
                        <div
                            className={cls.avt}
                            style={{ backgroundImage: `url(${avt})` }}
                        />
                    </div>
                    <div className={cls.avt_change}>
                        <div>{username}</div>
                        <div>Thay đổi ảnh đại diện</div>
                    </div>
                </div>
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
                    <input className={cls.input} value="0123456789" />
                </div>
                <div className={cls.button}>
                    <aside className={cls.aside} />
                    <Button
                        className={cls.button_click}
                        type="primary"
                        htmlType="submit"
                        disabled={false}
                    >
                        Gửi
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
