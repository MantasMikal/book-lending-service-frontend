import React, { useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import styles from "./RequestLayout.module.scss";
import Container from "../../Primitive/Container";
import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";
import { Button, Input, message } from "antd";
import moment from "moment";

import UserContext from "../../../contexts/user";
import {
  getRequestMessages,
  getRequestById,
  sendMessage,
} from "../../../utilities/fetch-helpers";
import { useParams } from "react-router-dom";
import Message from "../../Common/Message";
import Spinner from "../../Primitive/Spinner";

const RequestLayout = (props) => {
  const { user } = useContext(UserContext);
  const { ID, token } = user;
  const { requestID } = useParams();
  const [messages, setMessages] = useState([]);
  const [request, setRequest] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [messageInput, setMessageInput] = useState("");

  // Get other participant ID
  const receiverID =
    request.requesterID === ID ? request.bookOwnerID : request.requesterID;

  useEffect(() => {
    setIsLoading(true);
    fetchRequest(requestID, token);
    fetchMessages(requestID, token);
    setIsLoading(false);
  }, [requestID, token]);

  // Fetch messages every 3s
  useEffect(() => {
    const timer = setInterval(() => {
      console.log("Fetching new messages");
      fetchMessages(requestID, token);
    }, 3000);
    return () => clearInterval(timer);
  });

  const fetchMessages = async (requestID, token) => {
    const messages = await getRequestMessages(requestID, token);
    !messages && message.error("Error fetching messages");
    setMessages(messages);
  };

  const fetchRequest = async (requestID, token) => {
    const request = await getRequestById(requestID, token);
    !request && message.error("Error fetching request");
    request[0] && setRequest(request[0]);
  };

  const handleMessageInput = (e) => {
    const message = e.target.value;
    setMessageInput(message);
  };

  const handleSendMessage = async (e) => {
    const data = {
      message: messageInput,
      senderID: ID,
      receiverID: receiverID,
      requestID: parseInt(requestID),
    };

    if (await sendMessage(token, data)) {
      fetchMessages(requestID, token);
      setMessageInput("");
    } else {
      message.error("Could not send message");
    }
  };

  const { title, dateCreated, bookID } = request;
  const formattedDate = moment
    .utc(dateCreated)
    .local()
    .format("MM/DD/YYYY, h:mm a")
    .toString();
  return (
    request && (
      <Container gutter fullHeight className={styles.RequestLayout}>
        <div className={styles.RequestDetails}>
          <div className={styles.Title}>
            <Title level={2}>{title}</Title>
            <div className={styles.Actions}>
              <Button>Accept</Button>
              <Button danger>Decline</Button>
            </div>
          </div>
          <Text>{formattedDate}</Text>
          <Text className={styles.ViewBookLink}>
            <a href={`/book/${bookID}`}>View book</a>
          </Text>
        </div>
        <div className={styles.Messages}>
          {isLoading ? (
            <Spinner />
          ) : (
            messages &&
            messages.length > 0 &&
            messages.map((message, i) => (
              <Message key={`Message-${i}`} message={message} userID={ID} />
            ))
          )}
        </div>
        <div className={styles.MessageInput}>
          <Input
            onChange={handleMessageInput}
            onPressEnter={handleSendMessage}
            value={messageInput}
            placeholder="Type your message..."
          />
          <Button
            disabled={messageInput.length < 1}
            onClick={handleSendMessage}
          >
            Send
          </Button>
        </div>
      </Container>
    )
  );
};

RequestLayout.propTypes = {};

export default RequestLayout;
