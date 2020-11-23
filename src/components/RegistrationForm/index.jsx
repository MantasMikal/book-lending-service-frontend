import React from "react";
import { Form, Input, Button, message } from "antd";

import Container from "../Container";
import Title from "antd/lib/typography/Title";
import { registerUser } from "../../utilities/fetch-helpers";
import { useHistory } from "react-router-dom";

import styles from "./RegistrationForm.module.scss";

/**
 * Registration form component for app signup.
 */
const RegistrationForm = () => {
  const history = useHistory();

  const onFinish = async (values) => {
    const { confirm, ...data } = values; // ignore the 'confirm' value in data sent
    if (await registerUser(data)) {
      message.success("Successfully registered. Please log in");
      history.push("/login");
    } else {
      message.error("Could register");
    }
  };

  return (
    <Container center gutter size="wide">
      <Title level={2}>Register</Title>
      <Form
        name="register"
        onFinish={onFinish}
        scrollToFirstError
        layout="vertical"
        size="middle"
      >
        <div className={styles.FormInner}>
          <div className={styles.FormWrapper}>
            <Form.Item name="username" label="Username" rules={usernameRules}>
              <Input />
            </Form.Item>

            <Form.Item name="fullName" label="Full Name" rules={fullNameRules}>
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
};

export default RegistrationForm;



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
]

const usernameRules = [
  { required: true, message: "Please input your username!", whitespace: true },
];


const fullNameRules = [
  { required: true, message: "Please input your full name!", whitespace: true },
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