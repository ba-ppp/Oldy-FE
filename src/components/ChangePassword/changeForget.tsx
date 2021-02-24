import { Button } from 'antd';
import { ReactComponent as NotVisible } from 'assets/images/auth/not-visible.svg';
import { ReactComponent as Visible } from 'assets/images/auth/visible.svg';
import logo from 'assets/images/logo/logo_192x192_w.jpg';
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

    const [passwordType, setPasswordType] = useState('password');
    const [rePasswordType, setRePasswordType] = useState('password');

    const [passwordVisible, setPasswordVisible] = useState(false);

    const [isEmpty, setIsEmpty] = useState(true);
    const onChangePassword = () => {
        setPasswordType('');
        setRePasswordType('');
        setPasswordVisible(true);
        setIsEmpty(false);
    };
    const onChangeRePassword = () => {
        console.log('hi');
    };
    const hidePassword = () => {
        console.log('hi');
    };
    const onFinish = () => {
        console.log('hi');
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
                    <input
                        name="repassword"
                        ref={register}
                        className={cls.input}
                        placeholder="Nhập lại mật khẩu"
                        onChange={onChangeRePassword}
                        type={rePasswordType}
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
                        Đổi mật khẩu
                    </Button>
                </form>
            </div>
        </div>
    );
};

export default ChangeForget;
