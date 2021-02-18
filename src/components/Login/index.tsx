import { Button, Checkbox, Form, Input } from 'antd';
import openNotificationWithIcon from 'helpers/design/notification';
import logo from 'assets/images/logo/logo_192x192_w.jpg';
import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import cls from './_login.module.scss';
import { login } from 'api/auth'

const axios = require('axios').default;

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

const MyForm = () => {
  const [form] = Form.useForm();
  const [isLogin, setIsLoggin] = useState(false);
  const onFinish = (values: any) => {
   console.log(values);
    
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
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
                        hasFeedback
                        rules={[
                            () => ({
                                validator(_, value) {
                                  
                                },
                            }),
                            
                        ]}
                    >
                        <Input placeholder="Tên người dùng" style={{marginLeft:60}}/>
                    </Form.Item>

                    <Form.Item
                        name="password"
                        rules={[
                            () => ({
                                validator(_, value) {
                                    
                                },
                            }),
                        ]}
                    >
                        <Input.Password placeholder="Mật khẩu" style={{marginLeft:60}}/>
                    </Form.Item>

                    <Form.Item name="remember" valuePropName="checked" style={{marginLeft:60}}>
                      <Checkbox>Remember me</Checkbox>
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
};

export default MyForm