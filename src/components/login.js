import React from "react";
import { Form, Input, Button } from "antd";
import { status, json } from "../utilities/requestHandlers";
import UserContext from "../contexts/user";

// add some layout to keep the form organised on different screen sizes
const formItemLayout = {
  labelCol: { xs: { span: 24 }, sm: { span: 6 } },
  wrapperCol: { xs: { span: 24 }, sm: { span: 12 } },
};
const tailFormItemLayout = {
  wrapperCol: { xs: { span: 24, offset: 0 }, sm: { span: 16, offset: 6 } },
};

// define validation rules for the form fields
const passwordRules = [
  { required: true, message: "Please input your password!" },
];

const usernameRules = [
  { required: true, message: "Please input your username!", whitespace: true },
];

/**
 * Login form component for app signup.
 */
class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    this.login = this.login.bind(this);
  }

  static contextType = UserContext;

  login(values) {
    const { username, password } = values;
    console.log(`logging in user: ${username}`);
    const token = btoa(username + ":" + password)
    fetch("http://localhost:3030/api/v1/users/login", {
      method: "POST",
      headers: {
        Authorization: "Basic " + token,
      },
    })
      .then(status)
      .then(json)
      .then((user) => {
        console.log("Logged in successfully");
        console.log(user);
        this.context.login(user, token);
      })
      .catch((error) => {
        // TODO: show nicely formatted error message
        console.log("Login failed");
      });
  }

  render() {
    return (
      <Form
        {...formItemLayout}
        name="login"
        onFinish={this.login}
        scrollToFirstError
      >
        <Form.Item name="username" label="Username" rules={usernameRules}>
          <Input />
        </Form.Item>
        <Form.Item
          name="password"
          label="Password"
          rules={passwordRules}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Login
          </Button>
        </Form.Item>
      </Form>
    );
  }
}

export default LoginForm;
