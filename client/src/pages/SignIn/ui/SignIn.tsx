import { signInFx, useAuth } from '../index';
import { Col, Form, Input, Row } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import { BizRoutes } from '../../../utils/const';
// import logo from '../../../assets/logo.svg'
import '../index'
const Auth = () => {
  const [signIn, loading] = useAuth();
  const navigate = useNavigate();
  signInFx.done.watch(() => {
    navigate('/profile');
  })

  return (
    <Col className='styles'>
      <Row justify={'center'}>
        <div>
          <div className='header'>
            {/* <img src={logo} alt="" /> */}
            <h1>Вход</h1>
          </div>
          <Form
            className='form'
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={signIn}
          >
            <Form.Item
              label="Email"
              name="email"
              rules={[{ required: true, message: 'Please input your username!' }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please input your password!' }]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <div className='buttons'>
                <button className='button' type='submit'>Войти</button>
                <Link className='button' to={BizRoutes.REGISTRATION}>Регистрация</Link>
              </div>
            </Form.Item>
          </Form>
        </div>
      </Row>
    </Col>
  );
}

export default Auth;