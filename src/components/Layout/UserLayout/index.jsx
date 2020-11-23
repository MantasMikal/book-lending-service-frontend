import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./UserLayout.module.scss";
import Container from "../../Container";
import { fetchUserById } from "../../../utilities/fetch-helpers";
import { Descriptions, message } from "antd";
import { useParams } from "react-router-dom";
import UserContext from "../../../contexts/user";
import Title from "antd/lib/typography/Title";
import Paragraph from "antd/lib/skeleton/Paragraph";

const UserLayout = (props) => {
  const [account, setAccount] = useState({});
  console.log("🚀 ~ file: index.jsx ~ line 12 ~ account", account);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useContext(UserContext);
  const { token } = user;
  const { userID } = useParams();

  useEffect(() => {
    setIsLoading(true);
    fetchAccount(userID, token);
    setIsLoading(false);
  }, [userID, token]);

  const fetchAccount = async (userID, token) => {
    const account = await fetchUserById(userID, token);
    if (account) {
      setAccount(account);
    } else message.error("Error fetching account");
  };

  const { username, email, address, postcode, city, country, fullName } = account;

  return (
    <Container gutter>
      <Title level={2}>User {username} details</Title>
      <Descriptions layout='vertical' column={2} bordered>
        <Descriptions.Item label="Full Name">{fullName}</Descriptions.Item>
        <Descriptions.Item label="Email Address">{email}</Descriptions.Item>
        <Descriptions.Item label="Address">
          {address}
          <br />
          {city}
          <br />
          {country}
          <br />
          {postcode}
        </Descriptions.Item>
      </Descriptions>
    </Container>
  );
};

UserLayout.propTypes = {};

export default UserLayout;