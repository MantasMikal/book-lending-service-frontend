import React from "react";
import { useHistory } from "react-router-dom";
import { registerUser } from "../../../utilities/fetch-helpers";
import { message } from "antd";
import Title from "antd/lib/typography/Title";
import Container from "../../Primitive/Container";
import RegistrationForm from "../../Common/RegistrationForm";

import styles from "./RegistrationLayout.module.scss";

/**
 * Registration page layout
 */
const RegistrationLayout = () => {
  const history = useHistory();
  const onSubmit = async (values) => {
    const { confirm, ...data } = values; // ignore the 'confirm' value in data sent
    if (await registerUser(data)) {
      message.success("Successfully registered. Please log in");
      history.push("/login");
    } else {
      message.error("Could not register");
    }
  };

  return (
    <Container size="medium" gutter>
      <Title level={2}>Registration</Title>
      <div className={styles.FormWrapper}>
        <RegistrationForm onSubmit={onSubmit} />
      </div>
    </Container>
  );
};

export default RegistrationLayout;
