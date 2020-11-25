import React, { useState } from "react";
import PropTypes from "prop-types";

import Message from "../Message";
import Text from "antd/lib/typography/Text";
import { Button, Input } from "antd";

import styles from "./Messenger.module.scss";

/**
 * Messenger component that handles sending and viewing messages
 */
const Messenger = ({ messages, receiver, userID, onSend }) => {
  const [messageInput, setMessageInput] = useState("");
  if (!messages || !receiver) return null;

  const handleMessageInput = (e) => {
    const message = e.target.value;
    setMessageInput(message);
  };

  const handleSend = () => {
    onSend(messageInput);
    setMessageInput("");
  };

  return (
    <div className={styles.Messenger}>
      <div className={styles.Header}>
        <Text>
          Conversation with{" "}
          <a href={`/user/${receiver.ID}`}>{receiver.username}</a>
        </Text>
      </div>
      <div className={styles.Messages}>
        {messages && messages.length > 0 ? (
          messages.map((message, i) => message && (
            <Message key={`Message-${i}`} message={message} userID={userID} />
          ))
        ) : (
          <p>No messages.</p>
        )}
        <div className={styles.Anchor} />
      </div>
      <div className={styles.MessageInput}>
        <Input
          onChange={handleMessageInput}
          onPressEnter={handleSend}
          value={messageInput}
          placeholder="Type your message..."
        />
        <Button disabled={messageInput.length < 1} onClick={handleSend}>
          Send
        </Button>
      </div>
    </div>
  );
};

Messenger.propTypes = {
  messages: PropTypes.arrayOf(
    PropTypes.shape({
      message: PropTypes.string.isRequired,
      senderID: PropTypes.number.isRequired,
      receiverID: PropTypes.number.isRequired,
      dateCreated: PropTypes.string.isRequired,
    })
  ),
  receiver: PropTypes.shape({
    ID: PropTypes.number.isRequired,
    username: PropTypes.string.isRequired,
  }),
  userID: PropTypes.number.isRequired,
  onSend: PropTypes.func.isRequired,
};

export default Messenger;
