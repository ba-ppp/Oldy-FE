// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/jsx-props-no-spreading */
import { Button, Checkbox, Form, Input } from 'antd';
import openNotificationWithIcon from 'helpers/design/notification';
import logo from 'assets/images/logo/logo_192x192_w.jpg';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { login } from 'api/auth';
import cls from './_login.module.scss';


type State = {
  username: string,
  password: string
}

// style
const formItemLayout = {
    labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
    },
    wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
    },
};

const tailFormItemLayout = {
    wrapperCol: {
        xs: {
            span: 24,
            offset: 0,
        },
        sm: {
            span: 16,
            offset: 10,
        },
    },
};

const MyForm:React.FC = () => {
    const [form] = Form.useForm();

    // value user input
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    // can not click button when input is empty
    const [isEmpty, setIsEmpty] = useState(true);

    // login success
    const [isLogin, setIsLoggin] = useState(false);

    const onChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value)
    }
    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value)
    }

    const onFinish = (values: State) => {
        console.log(values);
      
    };


    return (
        <div className={cls.main}>
            <div className={cls.body}>
                <img alt="logo" className={cls.img_logo} src={logo} />
                <Form
                    {...formItemLayout}
                    form={form}
                    name="register"
                    onFinish={onFinish}
                    scrollToFirstError
                >

                    <Form.Item
                        name="username"           
                    >
                        <Input placeholder="Tên người dùng" style={{marginLeft:60}} onChange={onChangeUsername} />
                    </Form.Item>

                    <Form.Item
                        name="password"
                    >
                        <Input.Password placeholder="Mật khẩu" style={{marginLeft:60}} onChange={onChangePassword} />
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked" style={{marginLeft:60}}>
                        <Checkbox>Remember me</Checkbox>
                    </Form.Item>
      
                    <Form.Item {...tailFormItemLayout}>
                        <Button
                            type="primary"
                            htmlType="submit"
                            disabled={isEmpty}
                        >
                            Đăng kí
                        </Button>
                    </Form.Item>
                </Form>
                <div className={cls.redirect_login}>
                    Bạn đã có tài khoản?
                    <Link to='/login'> Đăng nhập</Link>
                </div>
                {/* switch to home */}
                {isLogin && (
                    <Redirect
                        to={{
                            pathname: "/",
                        }}
                    />
                )}
            </div>
        </div>
    );
};

export default MyForm