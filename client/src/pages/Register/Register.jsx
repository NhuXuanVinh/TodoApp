import React, { useState } from 'react';
import { registerUser } from '../../api/authAPI';
import { Form, Input, Button, Row, Col, message } from 'antd'; 
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [loading, setLoading] = useState(false); 
  const navigate = useNavigate();

  const handleRegister = async (values) => {
    setLoading(true);
    try {
      const data = await registerUser(values.username, values.email, values.password);
      message.success('Registered successfully!');
      navigate('/login'); // Redirect to login page after successful registration
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
          <h2 style={{ textAlign: 'center' }}>Register</h2>
          <Form
            onFinish={handleRegister}
            initialValues={{ username: '', email: '', password: '' }}
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
              label="Email"
              name="email"
              rules={[
                { required: true, message: 'Please enter your email!' },
                { type: 'email', message: 'Please enter a valid email!' },
              ]}
            >
              <Input
                placeholder="Enter your email"
                size="large"
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
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </Col>
    </Row>
  );
};

export default Register;
