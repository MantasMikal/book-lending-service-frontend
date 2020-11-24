import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import cn from "classnames";
import Avatar from "antd/lib/avatar/avatar";
import Text from "antd/lib/typography/Text";
import { UserOutlined } from "@ant-design/icons";

import styles from "./Message.module.scss";

const Message = ({ userID, message }) => {
  const { dateCreated, senderID } = message;
  console.log("🚀 ~ file: index.jsx ~ line 13 ~ Message ~ dateCreated", dateCreated)
  const messageBody = message.message;
  const formattedDate = moment
    .utc(dateCreated)
    .local()
    .format("MM/DD/YYYY, h:mm a")
    .toString();

  return (
    <div
      className={cn(
        styles.MessageWrapper,
        senderID === userID && styles.fromSender
      )}
    >
      <Avatar className={styles.Avatar} icon={<UserOutlined />} />
      <div className={styles.Message}>
        <Text className={styles.MessageBody}>{messageBody}</Text>
        <Text className={styles.MessageTimestamp}>{formattedDate}</Text>
      </div>
    </div>
  );
};

Message.propTypes = {
  senderID: PropTypes.number.isRequired,
  message: PropTypes.shape({
    message: PropTypes.string.isRequired,
    senderID: PropTypes.number.isRequired,
    receiverID: PropTypes.number.isRequired,
    dateCreated: PropTypes.string.isRequired,
  }),
};

export default Message;
