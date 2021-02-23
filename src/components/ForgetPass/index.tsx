import { unwrapResult } from '@reduxjs/toolkit';
import { Button, Form, Input } from 'antd';
import { addcode, getCode } from 'app/slices/codeSlice';
import logo from 'assets/images/logo/logo_192x192_w.jpg';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import cls from './_forget.module.scss';

type State = {
    email: string;
};

const Forget: React.FC = () => {
    const [form] = Form.useForm();
    const [isPost, setisPost] = useState(false);
    const dispatch = useDispatch();

    const onFinish = async (value: State) => {
        const actionResult = await dispatch(getCode(value));
        const result = unwrapResult(actionResult);
        const action = addcode(result);
        dispatch(action);
        setisPost(true);
    };

    return (
        <div className={cls.main}>
            <img alt="logo" className={cls.img_logo} src={logo} />
            <h4 className={cls.trouble}>Có vấn đề về đăng nhập?</h4>
            <p>
                Hãy nhập vào email hoặc tên người dùng
                <br />
                của bạn chúng tôi sẽ gửi mã số xác nhận cho bạn
            </p>
            <Form
                form={form}
                name="register"
                onFinish={onFinish}
                scrollToFirstError
            >
                <Form.Item name="account">
                    <Input placeholder="Email, tên người dùng" />
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Gửi mã
                    </Button>
                </Form.Item>
            </Form>
            {isPost && (
                <Redirect
                    to={{
                        pathname: '/forget-password/input-code',
                    }}
                />
            )}
        </div>
    );
};

export default Forget;
