import { Button, Form, Input } from 'antd';
import openNotificationWithIcon from 'helpers/design/notification';
import logo from 'assets/images/logo/logo_192x192_w.jpg';
import { useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import cls from './_login.module.scss';

const axios = require('axios').default;

const MyForm = () => {
  const [isLoggin, setIsLoggin] = useState(false);
  const onFinish = (values: any) => {
    // console.log(values);
    axios.post('https://oldybe.herokuapp.com/login', values)
    .then(function (response: any) {
      console.log(response);
      const data = response.data;
      if (data.isLogin){        
        localStorage.setItem('token', data.token);
        setIsLoggin(true);
      } else {
        openNotificationWithIcon('error',data.error,'Đăng nhập thất bại')
      }
    })
    .catch(function (error: any) {
      console.log(error);
    });
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className={cls.MainBox}>
        <img src={logo} style={{margin:'auto', display: 'block'}}/>
    <div>
      <Form
        name="basic"
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
      >
        <Form.Item
          className={cls.item}
          name="account"
          rules={[
            {
              message: 'Vui lòng nhập tài khoản!',
            },
          ]}
        >
          <Input placeholder='Tài khoản' className={cls.input}/>
        </Form.Item>

        <Form.Item className={cls.item}
          name="password"
          rules={[
            {
              message: 'Vui lòng nhập mật khẩu!',
            },
          ]}
        >
          <Input.Password placeholder='Mật khẩu' className={cls.input}/>
        </Form.Item>

        <Form.Item >
          <Button type="primary" htmlType="submit" className={cls.btn} >
            Đăng nhập
          </Button>
        </Form.Item>
        <Form.Item>
          <div className={cls.line}>
            <Link to='/forget-pass' style={{color: '#1890ff'}}>Quên mật khẩu? </Link>
          </div>
        </Form.Item>
        <Form.Item >
          <div className={cls.line}>
            Bạn chưa có tài khoản?
            <Link to='/register' style={{marginLeft: 10, color: '#1890ff'}}>Đăng kí </Link>
          </div>
        </Form.Item>
      </Form>
      {isLoggin && (<Redirect to={{pathname: "/"}}/>)}
 
    </div>
    </div>
  );
};

export default MyForm