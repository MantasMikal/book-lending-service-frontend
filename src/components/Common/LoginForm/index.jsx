import React, { useContext } from "react";
import { Form, Input, Button, message } from "antd";
import { useHistory } from "react-router-dom";
import UserContext from "../../../contexts/user";
import { authenticate } from "../../../utilities/fetch-helpers";
import Container from "../../Primitive/Container";

import styles from './LoginForm.module.scss'
import Title from "antd/lib/typography/Title";

/**
 * Login form component for app signup.
 */
const LoginForm = () => {
  const { login } = useContext(UserContext);
  const history = useHistory();

  const authenticateUser = async (values) => {
    const { username, password } = values;
    const token = btoa(username + ":" + password);
    const user = await authenticate(token);

    if (user) {
      message.success("Successfully logged in");
      login(user, token);
      history.push("/");
    } else {
      message.error("Could not log in");
    }
  };

  return (
    <Container size='small' gutter>
      <Title level={2}>Log In</Title>
      <div className={styles.FormWrapper}>
        <Form
          name="login"
          onFinish={authenticateUser}
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
      </div>
    </Container>
  );
};

export default LoginForm;
