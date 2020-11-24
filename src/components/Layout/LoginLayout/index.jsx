import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { authenticate } from "../../../utilities/fetch-helpers";
import UserContext from "../../../contexts/user";

import { message } from "antd";
import Title from "antd/lib/typography/Title";
import Container from "../../Primitive/Container";
import Login from "../../Common/LoginForm";

import styles from "./LoginLayout.module.scss";


const LoginLayout = () => {
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
    <Container size="small" gutter>
      <Title level={2}>Log In</Title>
      <div className={styles.FormWrapper}>
        <Login onSubmit={authenticateUser} />
      </div>
    </Container>
  );
};

export default LoginLayout;
