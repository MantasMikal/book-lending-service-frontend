import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import {
  getRequestMessages,
  getRequestById,
  sendMessage,
  fetchUserById,
} from "../../../utilities/fetch-helpers";

import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";
import { Button, message } from "antd";
import UserContext from "../../../contexts/user";
import Container from "../../Primitive/Container";

import Spinner from "../../Primitive/Spinner";

import styles from "./RequestLayout.module.scss";
import Messenger from "../../Common/Messenger";

const RequestLayout = () => {
  const { user } = useContext(UserContext);
  const { ID, token } = user;
  const { requestID } = useParams();
  const [messages, setMessages] = useState([]);
  const [request, setRequest] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [otherParticipant, setOtherParticipant] = useState({});

  const isBookOwner = request.bookOwnerID === ID;
  const isBookRequester = request.requesterID === ID;
  const { title, dateCreated, bookID } = request;
  const formattedDate = moment
    .utc(dateCreated)
    .local()
    .format("MM/DD/YYYY, h:mm a")
    .toString();

  useEffect(() => {
    const fetchRequest = async (requestID, token) => {
      setIsLoading(true);
      const request = await getRequestById(requestID, token);
      !request && message.error("Error fetching request");
      if (request[0]) {
        const { bookOwnerID, requesterID } = request[0];
        const otherParticipantID =
          requesterID === ID ? bookOwnerID : requesterID;
        await fetchOtherParticipant(token, otherParticipantID);
        setRequest(request[0]);
        setIsLoading(false);
      }
    };
    fetchRequest(requestID, token);
    fetchMessages(requestID, token);
  }, [requestID, token, ID]);

  // Fetch messages every 3s
  useEffect(() => {
    const timer = setInterval(() => {
      fetchMessages(requestID, token);
    }, 3000);
    return () => clearInterval(timer);
  });

  const fetchMessages = async (requestID, token) => {
    const messages = await getRequestMessages(requestID, token);
    !messages && message.error("Error fetching messages");
    setMessages(messages);
  };

  const fetchOtherParticipant = async (token, userID) => {
    const user = await fetchUserById(userID, token);
    !user && message.error("Could not fetch user");
    setOtherParticipant(user);
  };

  const handleSendMessage = async (msg) => {
    const data = {
      message: msg,
      senderID: ID,
      receiverID: otherParticipant.ID,
      requestID: parseInt(requestID),
    };
    if (await sendMessage(token, data)) {
      fetchMessages(requestID, token);
    } else {
      message.error("Could not send message");
    }
  };

  if (isLoading)
    return (
      <Container gutter fullHeight className={styles.RequestLayout}>
        <Spinner />
      </Container>
    );

  return (
    <Container gutter fullHeight className={styles.RequestLayout}>
      <div className={styles.RequestDetails}>
        <div className={styles.Title}>
          <Title level={2}>{title}</Title>
          <div className={styles.Actions}>
            {isBookOwner && (
              <>
                <Button>Accept</Button>
                <Button danger>Decline</Button>
              </>
            )}
            {isBookRequester && <Button danger>Cancel</Button>}
          </div>
        </div>
        <Text className={styles.ViewBookLink}>
          <a href={`/book/${bookID}`}>View book</a>
        </Text>
        <Text>{formattedDate}</Text>
      </div>
      <Messenger
          messages={messages}
          receiver={otherParticipant}
          onSend={handleSendMessage}
          userID={ID}
        />
    </Container>
  );
};

RequestLayout.propTypes = {};

export default RequestLayout;
