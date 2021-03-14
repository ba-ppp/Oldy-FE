import { Button } from 'antd';
import { changeProfile } from 'api/profile';
import { useSelector } from 'app/reducers/type';
import Header from 'components/Header';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import cls from './_profile.module.scss';
import openNotificationWithIcon from 'helpers/design/notification';
type State = {
    name: string;
    username: string;
    email: string;
    id: string;
};

const Profile: React.FC = () => {
    // form
    const { handleSubmit, register } = useForm<State>();

    const state = useSelector((state) => state.profile);
    const avt = state.avt;
    const id = state.id;

    const [name, setName] = useState(state.name);
    const [username] = useState(state.username);
    const [email, setEmail] = useState(state.email);
    const [phone, setPhone] = useState('0123456789');

    const onChangeName = (values: React.ChangeEvent<HTMLInputElement>) => {
        const value = values.target.value;
        setName(value);
    };
    const onChangeEmail = (values: React.ChangeEvent<HTMLInputElement>) => {
        const value = values.target.value;
        setEmail(value);
    };
    const onChangePhone = (values: React.ChangeEvent<HTMLInputElement>) => {
        const value = values.target.value;
        setPhone(value);
    };

    const onFinish = async (values: State) => {
        values.id = id;
        const data = await changeProfile(values);
        if (data.errorCode === 1) {
            openNotificationWithIcon(
                'warning',
                'Không thành công',
                data.message
            );
        } else {
            openNotificationWithIcon('success', 'Thành công', '');
        }
    };

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
            <form className={cls.main} onSubmit={handleSubmit(onFinish)}>
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
                    <input
                        className={cls.input}
                        onChange={onChangeName}
                        value={name}
                        name="name"
                        ref={register}
                    />
                </div>
                <div className={cls.compo}>
                    <div className={cls.label}>Tên người dùng:&nbsp;</div>
                    <input
                        className={cls.input}
                        disabled={true}
                        value={username}
                        name="username"
                    />
                </div>
                <div className={cls.compo}>
                    <div className={cls.label}>Email:&nbsp;</div>
                    <input
                        className={cls.input}
                        onChange={onChangeEmail}
                        value={email}
                        name="email"
                        ref={register}
                    />
                </div>
                <div className={cls.compo}>
                    <div className={cls.label}>Số điện thoại:&nbsp;</div>
                    <input
                        className={cls.input}
                        onChange={onChangePhone}
                        value={phone}
                        name="phone"
                        ref={register}
                    />
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
            </form>
        </div>
    );
};

export default Profile;
