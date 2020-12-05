import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchUserById } from "../../../utilities/fetch-helpers";

import { Descriptions, message } from "antd";
import UserContext from "../../../contexts/user";
import Title from "antd/lib/typography/Title";
import Container from "../../Primitive/Container";
import Spinner from "../../Primitive/Spinner";

/**
 * User account page. Shows user details
 */
const UserLayout = () => {
  const [account, setAccount] = useState({});
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

  if(isLoading) (
    <Container gutter>
      <Spinner />
    </Container>
  )
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
