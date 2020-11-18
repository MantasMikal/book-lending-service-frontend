import React from "react";
import { Form, Input, Button } from "antd";
import { status, json } from "../../utilities/requestHandlers";

import styles from "./RegistrationForm.module.scss";
import Container from "../Container";
import Title from "antd/lib/typography/Title";

// define validation rules for the form fields
const emailRules = [
  { type: "email", message: "The input is not valid E-mail!" },
  { required: true, message: "Please input your E-mail!" },
];

const passwordRules = [
  { required: true, message: "Please input your password!" },
];

const confirmRules = [
  { required: true, message: "Please confirm your password!" },
  // rules can include function handlers in which you can apply additional logic
  ({ getFieldValue }) => ({
    validator(rule, value) {
      if (!value || getFieldValue("password") === value) {
        return Promise.resolve();
      }
      return Promise.reject("The two passwords that you entered do not match!");
    },
  }),
];

const usernameRules = [
  { required: true, message: "Please input your username!", whitespace: true },
];

const cityRules = [
  {
    required: true,
    message: "Please input your city",
    whitespace: true,
    type: "string",
  },
];

const countryRules = [
  {
    required: true,
    message: "Please input your country",
    whitespace: true,
    type: "string",
  },
];

const addressRules = [
  {
    required: true,
    message: "Please input your address",
    whitespace: true,
    type: "string",
  },
];

const postcodeRules = [
  {
    required: true,
    message: "Please input your postcode",
    whitespace: true,
    type: "string",
  },
];

/**
 * Registration form component for app signup.
 */
class RegistrationForm extends React.Component {
  constructor(props) {
    super(props);
    this.onFinish = this.onFinish.bind(this);
  }

  onFinish = (values) => {
    console.log("Received values of form: ", values);
    const { confirm, ...data } = values; // ignore the 'confirm' value in data sent
    fetch("http://localhost:3030/api/v1/users", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(status)
      .then(json)
      .then((data) => {
        // TODO: display success message and/or redirect
        console.log(data);
        alert("User added");
      })
      .catch((err) => {
        // TODO: show nicely formatted error message and clear form
        alert("Error adding user");
      });
  };

  render() {
    return (
      <Container center gutter size="wide">
        <Title level={2}>Register</Title>
        <Form
          name="register"
          onFinish={this.onFinish}
          labelCol={{ sm: { span: 6 }, lg: { span: 8 } }}
          scrollToFirstError
          labelAlign="left"
        >
          <div className={styles.FormInner}>
            <div className={styles.FormWrapper}>
              <Form.Item name="username" label="Username" rules={usernameRules}>
                <Input />
              </Form.Item>

              <Form.Item name="email" label="E-mail" rules={emailRules}>
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

              <Form.Item
                name="confirm"
                label="Confirm Password"
                dependencies={["password"]}
                hasFeedback
                rules={confirmRules}
              >
                <Input.Password />
              </Form.Item>
            </div>
            <div className={styles.FormWrapper}>
              <Form.Item name="country" label="Country" rules={countryRules}>
                <Input />
              </Form.Item>

              <Form.Item name="city" label="City" rules={cityRules}>
                <Input />
              </Form.Item>

              <Form.Item name="postcode" label="Postcode" rules={postcodeRules}>
                <Input />
              </Form.Item>

              <Form.Item name="address" label="Address" rules={addressRules}>
                <Input />
              </Form.Item>
            </div>
          </div>
          <Form.Item>
            <Button type="primary" htmlType="submit">
              Register
            </Button>
          </Form.Item>
        </Form>
      </Container>
    );
  }
}

export default RegistrationForm;
