import { Button, Form, Input } from 'antd';
import { Reducer } from 'app/reducers';
import logo from 'assets/images/logo/logo_192x192_w.jpg';
import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';
import cls from './_forget.module.scss';
import { CodeReducer } from 'app/slices/codeSlice';

const InputCode: React.FC = () => {
    const [form] = Form.useForm();
    const [isSuccess, setisSuccess] = useState(false);
    // get code from code's reducer
    const codeState = useSelector((state: Reducer) => state.code.codeOTP);
    console.log(codeState);
    const onFinish = (value: any) => {
        setisSuccess(true);
        // if code correct
        // if (value.code.toString() === code.toString()) {
        //     window.localStorage.setItem('token', token);
        //     setisSuccess(true);
        // } else {
        //     // notification
        //     openNotificationWithIcon(
        //         'warning',
        //         'Mã xác nhận không chính xác',
        //         'Nhập mã thất bại'
        //     );
        // }
    };
    return (
        <div className={cls.main}>
            <img alt="logo" className={cls.img_logo} src={logo} />
            <h4 className={cls.trouble}>Nhập mã bảo mật</h4>
            <p>
                Hãy nhập mã bảo mật
                <br />
                mà chúng tôi đã gửi vào email của bạn
            </p>
            <Form
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
            >
                <Form.Item name="code">
                    <Input placeholder="Nhập mã" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Xác nhận
                    </Button>
                </Form.Item>
            </Form>
            {isSuccess && (
                <Redirect
                    to={{
                        pathname: '/change-password',
                    }}
                />
            )}
        </div>
    );
};

export default InputCode;
