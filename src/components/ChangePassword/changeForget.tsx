import { Button } from 'antd';
import logo from 'assets/images/logo/logo_192x192_w.jpg';
import openNotificationWithIcon from 'helpers/design/notification';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import cls from './_changeForget.module.scss';

type State = {
    password: string;
    repassword: string;
};

const ChangeForget: React.FC = () => {
    // form
    const { handleSubmit, register } = useForm<State>();

    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    const [isEmpty, setIsEmpty] = useState(true);
    const onChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setPassword(value);
        if (value && rePassword) {
            setIsEmpty(false);
        } else {
            setIsEmpty(true);
        }
    };
    const onChangeRePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setRePassword(value);
        if (password && value) {
            setIsEmpty(false);
        } else {
            setIsEmpty(true);
        }
    };
    const onFinish = (values: State) => {
        if (password.length < 6) {
            openNotificationWithIcon(
                'warning',
                'Đổi mật khẩu thất bại',
                'Mật khẩu quá ngắn'
            );
            return null;
        }
        if (password !== rePassword) {
            openNotificationWithIcon(
                'warning',
                'Đổi mật khẩu thất bại',
                'Mật khẩu không khớp'
            );
            return null;
        }
    };
    return (
        <div className={cls.main}>
            <div className={cls.body}>
                <img alt="logo" className={cls.img_logo} src={logo} />
                <form className={cls.form} onSubmit={handleSubmit(onFinish)}>
                    <input
                        name="password"
                        ref={register}
                        className={cls.input}
                        placeholder="Mật khẩu mới"
                        onChange={onChangePassword}
                        type="password"
                    />
                    <input
                        name="repassword"
                        ref={register}
                        className={cls.input}
                        placeholder="Nhập lại mật khẩu"
                        onChange={onChangeRePassword}
                        type="password"
                    />
                    <Button
                        className={cls.button}
                        type="primary"
                        htmlType="submit"
                        disabled={isEmpty}
                    >
                        Đổi mật khẩu
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ChangeForget;
