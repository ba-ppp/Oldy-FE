import { Button } from 'antd';
import { changePassword } from 'api/auth/index';
import logo from 'assets/images/logo/logo_192x192_w.jpg';
import openNotificationWithIcon from 'helpers/design/notification';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Redirect } from 'react-router-dom';
import cls from './_changeForget.module.scss';
import jwt from 'jsonwebtoken';

type State = {
    password: string;
    repassword: string;
};

type Decode = {
    username: string;
};

const ChangeForget: React.FC = () => {
    // form
    const { handleSubmit, register } = useForm<State>();

    // password input
    const [password, setPassword] = useState('');
    const [rePassword, setRePassword] = useState('');

    // check empty
    const [isEmpty, setIsEmpty] = useState(true);

    // check change success
    const [isSuccess, setIsSuccess] = useState(false);

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
    const onFinish = async (values: State) => {
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
        const token = window.localStorage.getItem('token');
        if (!token) return null;
        const decode: Decode | any = jwt.decode(token);

        const result = await changePassword({
            username: decode.username,
            password: values.password,
        });
        if (!result.error) {
            openNotificationWithIcon('success', 'Đổi mật khẩu thành công', '');
            setTimeout(() => {
                setIsSuccess(true);
            }, 500);
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
            {/* switch to home */}
            {isSuccess && (
                <Redirect
                    to={{
                        pathname: '/',
                    }}
                />
            )}
        </div>
    );
};

export default ChangeForget;
