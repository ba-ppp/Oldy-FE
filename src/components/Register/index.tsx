import {
    Button, Form,
    Input
} from 'antd';
import 'antd/dist/antd.css';
import logo from 'assets/images/logo/logo_192x192_w.jpg';
import axios from 'axios';
import cls from './_register.module.scss';
import Notification from 'helpers/design/notification';
import React, { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';


Register.propTypes = {

};
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




function Register() {
  const [form] = Form.useForm();
  const [isLogin, setisLogin] = useState(false);
  const [checkUsername, setcheckUsername] = useState("");
  const [checkName, setcheckName] = useState("");
  const [checkEmail, setcheckEmail] = useState<'success' | 'error' | undefined>(undefined);
  const [inputUsername, setinputUsername] = useState("");
  const [inputName, setinputName] = useState("");


  // submit
  const onFinish = (values: any) => {
      console.log(values);
    // axios
    //   .post(process.env.REACT_APP_API_REGISTER, values)
    //   .then((res) => {
    //     const data = res.data;
    //     if (data.error) {
    //       // nortification
    //       Notification("error", data.error, "Đăng kí thất bại");
    //       setcheckUsername("error");
    //       form.resetFields();
    //     } else {
    //       window.localStorage.setItem("token", data.token);
    //       setisLogin(true);
    //     }
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   });
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
                        name="email"
                        label="E-mail"
                        hasFeedback
                        validateStatus = {checkEmail}
                        rules={[
                            () => ({
                                validator(_, value) {
                                    setcheckEmail("error");
                                    let dot = value.indexOf('.');
                                    let adot = value.indexOf('@');
                                    if (!value){
                                        return Promise.reject('Hãy nhập vào email của bạn')
                                    }
                                    else if (dot <= adot || dot === value.length - 1) {
                                        return Promise.reject('Hãy nhập email hợp lệ');
                                    }
                                    else{
                                        setcheckEmail('success');
                                        return Promise.resolve();
                                    }
                                },
                            }),
                            
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="username"
                        initialValue={inputUsername}
                        hasFeedback
                        label={
                        <span>
                            Tên người dùng&nbsp;
                        </span>
                        }
                        rules={[
                            () => ({
                                validator(_, value) {
                                    setcheckUsername('error');
                                    const pattern = /[a-z]/
                                    if(!value.toLowerCase().match(pattern)){
                                        return Promise.reject('Tên người dùng phải chứa ký tự chữ cái')
                                    }
                                    if(value.length >= 3){
                                        setcheckUsername('success');
                                    }else{
                                        return Promise.reject('Tên người dùng phải chứa ít nhất 3 ký tự')
                                    }
                                    setinputUsername(value);
                                    return Promise.resolve()
                                },
                            }),
                        ]}

                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="name"
                        initialValue={inputName}
                        hasFeedback
                        label={
                        <span>
                            Tên đầy đủ&nbsp;
                        </span>
                        }
                        rules={[
                            () => ({
                                validator(_, value) {
                                    setcheckName('error');
                                    
                                    const pattern = /[0-9]/;
                                    if(value.match(pattern)){
                                        return Promise.reject('Hãy nhập tên hợp lệ')
                                    }
                                    else if(value.length >= 3 ){
                                        setcheckName('success');
                                    }else{
                                        return Promise.reject('Tên đầy đủ phải chứa ít nhất 3 ký tự')
                                    }
                                    setinputName(value);
                                    return Promise.resolve()
                                },
                            }),
                        ]}

                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label={
                        <span>
                            Mật khẩu&nbsp;
                        </span>
                        }
                        hasFeedback
                        rules={[
                            () => ({
                                validator(_, value) {
                                    if (!value) {
                                        return Promise.reject('Hãy nhập vào mật khẩu của bạn')
                                    }
                                    if (value.length >= 6) {
                                        return Promise.resolve();
                                    }

                                    return Promise.reject('Mật khẩu phải chứa ít nhất 6 ký tự');
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                
                    <Form.Item {...tailFormItemLayout}>
                        <Button type="primary"
                            htmlType="submit"
                        >
                            Đăng kí
                        </Button>
                    </Form.Item>
                </Form>
                <div className={cls.redirect_login}>
                    Bạn đã có tài khoản?<Link to='/login'> Đăng nhập</Link>
                </div>
                {/* switch to home */}
                {isLogin && (<Redirect
                    to={{
                        pathname: "/",
                    }}
                />
                )}
            </div>
        </div>
                
    );
}

export default Register;