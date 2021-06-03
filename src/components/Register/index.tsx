import { yupResolver } from '@hookform/resolvers/yup';
import { Button } from 'antd';
import logo from 'assets/images/logo/logo_192x192_w.jpg';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Redirect } from 'react-router-dom';
import * as yup from 'yup';
import cls from './_register.module.scss';
import { useDispatch } from 'react-redux';
import { addProfile, getRegister } from 'app/slices/userProfileSlice';
import { unwrapResult } from '@reduxjs/toolkit';
import openNotificationWithIcon from 'helpers/design/notification';

type State = {
    name: string;
    username: string;
    email: string;
    password: string;
};

const validation = yup.object().shape({
    name: yup
        .string()
        .matches(/^[a-zA-Z\s]*$/, 'Vui lòng nhập tên hợp lệ')
        .required('Hãy nhập tên của bạn'),

    username: yup.string().min(3, 'Tên người dùng không hợp lệ').required(),

    email: yup
        .string()
        .email('Vui lòng nhập email hợp lệ')
        .required('Hãy nhập email hợp lệ'),

    password: yup
        .string()
        .min(6, 'Mật khẩu phải có độ dài lớn hơn 6')
        .required(),
});

const Register: React.FC = () => {
    // form
    const { handleSubmit, register, errors } = useForm<State>({
        resolver: yupResolver(validation),
    });

    const dispatch = useDispatch();

    // user input
    const [username, setUserName] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    // empty form
    const [empty, setEmpty] = useState(true);

    //register success
    const [isSuccess, setisSuccess] = useState(false);

    const onChangeName = (values: React.ChangeEvent<HTMLInputElement>) => {
        setName(values.target.value);
        if (values.target.value && username && email && password) {
            setEmpty(false);
        } else {
            setEmpty(true);
        }
    };
    const onChangeUserName = (values: React.ChangeEvent<HTMLInputElement>) => {
        setUserName(values.target.value);
        if (values.target.value && name && email && password) {
            setEmpty(false);
        } else {
            setEmpty(true);
        }
    };
    const onChangeEmail = (values: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(values.target.value);
        if (values.target.value && username && name && password) {
            setEmpty(false);
        } else {
            setEmpty(true);
        }
    };
    const onChangePassword = (values: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(values.target.value);
        if (values.target.value && username && email && name) {
            setEmpty(false);
        } else {
            setEmpty(true);
        }
    };

    const onFinish = async (values: State) => {
        const actionResult = await dispatch(getRegister(values));
        const result = unwrapResult(actionResult);

        if (result.error) {
            openNotificationWithIcon(
                'error',
                'Đăng kí thật bại',
                result.error
            );
        } else {
            const action = addProfile(result);
            dispatch(action);
            // set token
            window.localStorage.setItem('token', result.token);
            setisSuccess(true);
        }
    };

    // style
    const errorInput = { border: '1px solid red' };
    const corretInput = { border: '1px solid #e0dcdc' };

    return (
        <div className={cls.main}>
            <div className={cls.body}>
                <img alt="logo" className={cls.img_logo} src={logo} />
                <form className={cls.form} onSubmit={handleSubmit(onFinish)}>
                    <input
                        className={cls.input1}
                        name="name"
                        ref={register}
                        onChange={onChangeName}
                        placeholder="Tên đầy đủ"
                        style={errors.name ? errorInput : corretInput}
                    />
                    <p className={cls.error}>{errors.name?.message}</p>

                    <input
                        className={cls.input}
                        name="username"
                        ref={register}
                        onChange={onChangeUserName}
                        placeholder="Tên người dùng"
                        style={errors.username ? errorInput : corretInput}
                    />
                    <p className={cls.error}>{errors.username?.message}</p>

                    <input
                        className={cls.input}
                        name="email"
                        ref={register}
                        onChange={onChangeEmail}
                        placeholder="Email"
                        style={errors.email ? errorInput : corretInput}
                    />
                    <p className={cls.error}>{errors.email?.message}</p>

                    <input
                        className={cls.input}
                        name="password"
                        ref={register}
                        onChange={onChangePassword}
                        placeholder="Mật khẩu"
                        style={errors.password ? errorInput : corretInput}
                        type="password"
                    />
                    <p className={cls.error}>{errors.password?.message}</p>

                    <Button
                        className={cls.button}
                        type="primary"
                        htmlType="submit"
                        disabled={
                            empty ||
                            errors.password ||
                            errors.email ||
                            errors.name ||
                            errors.username
                                ? true
                                : false
                        }
                    >
                        Đăng kí
                    </Button>
                </form>
                <div className={cls.redirect_login}>
                    Bạn đã có tài khoản?
                    <Link to="/login"> Đăng nhập</Link>
                </div>
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

export default Register;
