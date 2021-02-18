// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable react/jsx-props-no-spreading */
import { Button, Checkbox, Form, Input } from 'antd';
import { login } from 'api/auth';
import { addProfile } from 'app/slices/userProfileSlice';
import logo from 'assets/images/logo/logo_192x192_w.jpg';
import openNotificationWithIcon from 'helpers/design/notification';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import cls from './_login.module.scss';


type State = {
  username: string,
  password: string,
  remember: boolean
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

const Login:React.FC = () => {
    const [form] = Form.useForm();
    const dispatch = useDispatch();

    // value user input
    const [usernameInput, setUsernameInput] = useState("")
    const [passwordInput, setPasswordInput] = useState("")

    // can not click button when input is empty
    const [isEmpty, setIsEmpty] = useState(true);

    // login success
    const [isLogin, setIsLoggin] = useState(false);   

    // check input form is empty 
    const onChangeUsername = (event: React.ChangeEvent<HTMLInputElement>) => {
        const username = event.target.value;
        setUsernameInput(username);
        if(username && passwordInput){
            setIsEmpty(false)
        }else{
            setIsEmpty(true);
        }
    }
    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const password = event.target.value;

        // if password be able to login
        if(password.length >= 6){
            // if form not empty
            if(usernameInput && password){
                setIsEmpty(false)
            }else{
                setIsEmpty(true);
            }
            setPasswordInput(password);
        }else{
            setIsEmpty(true);
        }
        
        
    }

    const onFinish = async (values: State) => {
        login(values)
            .then((response) => {
                const { error, email, name, username, token } = response;

                // if username or password not correct
                if(error){
                    openNotificationWithIcon('error','Đăng nhập thất bại', error);
                    return null;
                }

                // else
                const data = {
                    email,
                    name,
                    username
                }
                const action = addProfile(data);
                dispatch(action);

                // set token to local storage
                if(token){
                    window.localStorage.setItem('token', token);
                }
                setIsLoggin(true);
                return null;
            })
            .catch((error) => {
                throw new Error(error)
            })
        
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
                            Đăng nhập
                        </Button>
                    </Form.Item>
                </Form>
                <div className={cls.redirect_login}>
                    Bạn chưa có tài khoản?
                    <Link to='/register'> Đăng kí</Link>
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

export default Login