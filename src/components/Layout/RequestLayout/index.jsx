import React from "react";
import cn from "classnames";

import PropTypes from "prop-types";
import styles from "./RequestLayout.module.scss";
import Container from "../../Primitive/Container";
import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";
import { Button, Input } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { UserOutlined } from "@ant-design/icons";

const request = {
  ID: 1,
  title: "Request to Mantas",
  dateRequested: "12/23/2020",
  bookTitle: "12 Rules for life",
  status: "Requested",
  messages: [
    {
      from: "mantas2",
      to: "mantas",
      timestamp: "12/23/2020",
      message: "Hello buddy",
    },
    {
      from: "mantas",
      to: "mantas2",
      timestamp: "12/23/2020",
      message: "Hello",
    },
    {
      from: "mantas2",
      to: "mantas",
      timestamp: "12/23/2020",
      message: "Hello buddy",
    },
    {
      from: "mantas",
      to: "mantas2",
      timestamp: "12/23/2020",
      message: "Hello",
    },
    {
      from: "mantas2",
      to: "mantas",
      timestamp: "12/23/2020",
      message: "Hello buddy",
    },
    {
      from: "mantas",
      to: "mantas2",
      timestamp: "12/23/2020",
      message: "Hello",
    },
    {
      from: "mantas2",
      to: "mantas",
      timestamp: "12/23/2020",
      message: "Hello buddy",
    },
    {
      from: "mantas",
      to: "mantas2",
      timestamp: "12/23/2020",
      message: "Hello",
    },
    {
      from: "mantas2",
      to: "mantas",
      timestamp: "12/23/2020",
      message: "Hello buddy",
    },
    {
      from: "mantas",
      to: "mantas2",
      timestamp: "12/23/2020",
      message: "Hello",
    },
    {
      from: "mantas2",
      to: "mantas",
      timestamp: "12/23/2020",
      message: "Hello buddy",
    },
    {
      from: "mantas",
      to: "mantas2",
      timestamp: "12/23/2020",
      message: "Hello",
    },
    {
      from: "mantas2",
      to: "mantas",
      timestamp: "12/23/2020",
      message: "Hello buddy",
    },
    {
      from: "mantas",
      to: "mantas2",
      timestamp: "12/23/2020",
      message: "Hello",
    },
    {
      from: "mantas2",
      to: "mantas",
      timestamp: "12/23/2020",
      message: "Hello buddy",
    },
    {
      from: "mantas",
      to: "mantas2",
      timestamp: "12/23/2020",
      message: "Hello",
    },
    {
      from: "mantas2",
      to: "mantas",
      timestamp: "12/23/2020",
      message: "Hello buddy",
    },
    {
      from: "mantas",
      to: "mantas2",
      timestamp: "12/23/2020",
      message: "Hello",
    },
    {
      from: "mantas2",
      to: "mantas",
      timestamp: "12/23/2020",
      message: "Hello buddy",
    },
    {
      from: "mantas",
      to: "mantas2",
      timestamp: "12/23/2020",
      message: "Hello",
    },
    {
      from: "mantas2",
      to: "mantas",
      timestamp: "12/23/2020",
      message: "Hello buddy",
    },
    {
      from: "mantas",
      to: "mantas2",
      timestamp: "12/23/2020",
      message: "Hello",
    },
    {
      from: "mantas2",
      to: "mantas",
      timestamp: "12/23/2020",
      message: "Hello buddy",
    },
    {
      from: "mantas",
      to: "mantas2",
      timestamp: "12/23/2020",
      message: "Hello",
    },
    {
      from: "mantas2",
      to: "mantas",
      timestamp: "12/23/2020",
      message: "Hello buddy",
    },
    {
      from: "mantas",
      to: "mantas2",
      timestamp: "12/23/2020",
      message: "Hello",
    },
    {
      from: "mantas2",
      to: "mantas",
      timestamp: "12/23/2020",
      message: "Hello buddy",
    },
    {
      from: "mantas",
      to: "mantas2",
      timestamp: "12/23/2020",
      message: "Hello",
    },
  ],
};

const RequestLayout = (props) => {
  return (
    <Container gutter fullHeight className={styles.RequestLayout}>
      <div className={styles.RequestDetails}>
        <div className={styles.Title}>
          <Title level={2}>{request.title}</Title>
          <div className={styles.Actions}>
            <Button>Accept</Button>
            <Button danger>Decline</Button>
          </div>
        </div>
        <Text>{request.dateRequested}</Text>
      </div>
      <div className={styles.Messages}>
        {request.messages.map((message, i) => (
          <div
            className={cn(
              styles.MessageWrapper,
              message.from === "mantas" && styles.reverse
            )}
          >
            <Avatar className={styles.Avatar} icon={<UserOutlined />} />
            <div className={styles.Message}>
              <Text className={styles.MessageBody}>{message.message}</Text>
              <Text className={styles.MessageTimestamp}>
                {message.timestamp}
              </Text>
            </div>
          </div>
        ))}
      </div>
      <div className={styles.MessageInput}>
        <Input placeholder="Type your message..." />
        <Button>Send</Button>
      </div>
    </Container>
  );
};

RequestLayout.propTypes = {};

export default RequestLayout;
