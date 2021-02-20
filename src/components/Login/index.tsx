import { unwrapResult } from '@reduxjs/toolkit';
import { Button } from 'antd';
import { addProfile, getLogin } from 'app/slices/userProfileSlice';
import { ReactComponent as NotVisible } from 'assets/images/auth/not-visible.svg';
import { ReactComponent as Visible } from 'assets/images/auth/visible.svg';
import logo from 'assets/images/logo/logo_192x192_w.jpg';
import openNotificationWithIcon from 'helpers/design/notification';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import cls from './_login.module.scss';

type State = {
    username: string;
    password: string;
};

const Login: React.FC = () => {
    // form
    const { handleSubmit, register } = useForm<State>();

    //redux
    const dispatch = useDispatch();

    // value user input
    const [usernameInput, setUsernameInput] = useState('');
    const [passwordInput, setPasswordInput] = useState('');

    // password visible
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [passwordType, setPasswordType] = useState('password');

    // can not click button when input is empty
    const [isEmpty, setIsEmpty] = useState(true);

    // login success
    const [isLogin, setIsLoggin] = useState(false);

    // check input form is empty
    const onChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        const username = event.target.value;
        setUsernameInput(username);
        if (username && passwordInput) {
            setIsEmpty(false);
        } else {
            setIsEmpty(true);
        }
    };
    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const password = event.target.value;

        // if password be able to login
        if (password.length >= 6) {
            // if form not empty
            if (usernameInput && password) {
                setIsEmpty(false);
            } else {
                setIsEmpty(true);
            }
            setPasswordInput(password);
        } else {
            setIsEmpty(true);
        }
    };

    // password visible
    const hidePassword = () => {
        const hide = passwordVisible;
        setPasswordVisible(!passwordVisible);
        if (!hide) {
            setPasswordType('text');
        } else {
            setPasswordType('password');
        }
    };

    const onFinish = async (values: State) => {
        const actionResult = await dispatch(getLogin(values));
        const result = unwrapResult(actionResult);

        if (result.error) {
            openNotificationWithIcon(
                'error',
                'Đăng nhập thất bại',
                result.error
            );
        } else {
            addProfile(result);

            // set token
            window.localStorage.setItem('token', result.token);
            setIsLoggin(true);
        }
    };

    return (
        <div className={cls.main}>
            <div className={cls.body}>
                <img alt="logo" className={cls.img_logo} src={logo} />
                <form className={cls.form} onSubmit={handleSubmit(onFinish)}>
                    <input
                        name="username"
                        ref={register}
                        className={cls.input}
                        placeholder="Tên người dùng"
                        onChange={onChangeUsername}
                    />
                    <input
                        name="password"
                        ref={register}
                        className={cls.input}
                        placeholder="Mật khẩu"
                        onChange={onChangePassword}
                        type={passwordType}
                    />
                    <div className={cls.password}>
                        {passwordVisible && (
                            <Visible
                                height={20}
                                className={cls.icon}
                                onClick={hidePassword}
                            />
                        )}
                        {!passwordVisible && (
                            <NotVisible
                                height={20}
                                className={cls.icon}
                                onClick={hidePassword}
                            />
                        )}
                    </div>
                    <Button
                        className={cls.button}
                        type="primary"
                        htmlType="submit"
                        disabled={isEmpty}
                    >
                        Đăng nhập
                    </Button>

                    <div style={{ textAlign: 'center' }}>
                        <Link to="/forget-password">Quên mật khẩu?</Link>
                    </div>
                </form>
            </div>
            <div className={cls.newform}>
                <div className={cls.redirect_login}>
                    Bạn chưa có tài khoản?
                    <Link to="/register"> Đăng kí</Link>
                </div>
            </div>
            {/* switch to home */}
            {isLogin && (
                <Redirect
                    to={{
                        pathname: '/',
                    }}
                />
            )}
        </div>
    );
};

export default Login;
