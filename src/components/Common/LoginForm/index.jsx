import React from "react";
import PropTypes from "prop-types";
import { Form, Input, Button } from "antd";

import styles from "./LoginForm.module.scss";

/**
 * Login form component for app signup.
 */
const Login = ({ onSubmit }) => {
  return (
    <Form
      className={styles.Login}
      name="login"
      onFinish={onSubmit}
      scrollToFirstError
      layout="vertical"
    >
      <Form.Item
        name="username"
        label="Username"
        rules={[
          {
            required: true,
            message: "Please input your username!",
            whitespace: true,
          },
        ]}
      >
        <Input />
      </Form.Item>
      <Form.Item
        name="password"
        label="Password"
        rules={[{ required: true, message: "Please input your password!" }]}
        hasFeedback
      >
        <Input.Password />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

export default Login;


Login.propTypes = {
  onSubmit: PropTypes.func.isRequired
}