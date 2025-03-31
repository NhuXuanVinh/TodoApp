import React, { useState } from 'react';
import { loginUser } from '../../api/authAPI'; 
import { useNavigate } from 'react-router-dom';
import { Form, Input, Button, Row, Col, message } from 'antd'; 

const Login = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (values) => {
    setLoading(true);
    try {
      const data = await loginUser(values.username, values.password); 
      localStorage.setItem('token', data.token);
      message.success('Login successful!');
      navigate('/todo'); // Redirect to the todo page after login
    } catch (err) {
      message.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Row justify="center" style={{ marginTop: '50px' }}>
      <Col xs={24} sm={12} md={8}>
        <div style={{ padding: '20px', background: '#fff', borderRadius: '8px', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)' }}>
          <h2 style={{ textAlign: 'center' }}>Login</h2>
          <Form
            onFinish={handleLogin}
            initialValues={{ username: '', password: '' }}
            layout="vertical"
            requiredMark={false}
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[{ required: true, message: 'Please enter your username!' }]}
            >
              <Input
                placeholder="Enter your username"
                size="large"
                autoFocus
              />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[{ required: true, message: 'Please enter your password!' }]}
            >
              <Input.Password
                placeholder="Enter your password"
                size="large"
              />
            </Form.Item>

            <Form.Item style={{ textAlign: 'center' }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                loading={loading}
                block
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Login;
