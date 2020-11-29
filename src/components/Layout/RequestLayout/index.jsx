import React, { useContext, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import moment from "moment";
import {
  getRequestMessages,
  getRequestById,
  sendMessage,
  fetchUserById,
  archiveRequest,
  deleteBookRequest,
} from "../../../utilities/fetch-helpers";

import Title from "antd/lib/typography/Title";
import Text from "antd/lib/typography/Text";
import { Button, message } from "antd";
import UserContext from "../../../contexts/user";
import Container from "../../Primitive/Container";
import Messenger from "../../Common/Messenger";
import Spinner from "../../Primitive/Spinner";
import StatusBadge from "../../Primitive/Badge";
import UpdateBookStatusModal from "../../Common/UpdateBookStatusModal";

import styles from "./RequestLayout.module.scss";

const RequestLayout = () => {
  const { user } = useContext(UserContext);
  const history = useHistory();
  const { ID, token } = user;
  const { requestID } = useParams();
  const [messages, setMessages] = useState([]);
  const [request, setRequest] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [otherParticipant, setOtherParticipant] = useState({});
  const {
    title,
    dateCreated,
    bookID,
    status,
    bookStatus,
    isArchivedByRequester,
    isArchivedByReceiver,
  } = request;

  const isBookOwner = request.bookOwnerID === ID;
  const isBookRequester = request.requesterID === ID;
  const canEdit = isBookOwner && status !== "Completed";
  const canArchive =
    status === "Completed" &&
    !(
      (isBookOwner && isArchivedByReceiver) ||
      (isBookRequester && isArchivedByRequester)
    );

  const canCancel = status === "Open" && isBookRequester;

  const formattedDate = moment
    .utc(dateCreated)
    .local()
    .format("MM/DD/YYYY, h:mm a")
    .toString();

  useEffect(() => {
    fetchRequest(requestID, token);
    fetchMessages(requestID, token);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [requestID, token, ID]);

  // Fetch messages every 3s
  useEffect(() => {
    const timer = setInterval(() => {
      fetchMessages(requestID, token);
    }, 3000);
    return () => clearInterval(timer);
  });

  const fetchRequest = async (requestID, token) => {
    setIsLoading(true);
    const request = await getRequestById(requestID, token);
    !request && message.error("Error fetching request");
    if (request) {
      const { bookOwnerID, requesterID } = request;
      const otherParticipantID = requesterID === ID ? bookOwnerID : requesterID;
      await fetchOtherParticipant(token, otherParticipantID);
      setRequest(request);
      setIsLoading(false);
    }
  };

  const fetchMessages = async (requestID, token) => {
    const messages = await getRequestMessages(requestID, token);
    if(messages) {
      setMessages(messages.messages);
    } else {
      message.error("Error fetching messages");
    }
  };

  // Required to get username of the other participant
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

  const handleArchiving = async (requestID, token) => {
    if (await archiveRequest(requestID, token)) {
      message.success("Request has been archived");
      history.push("/book-requests");
    } else {
      message.error("Could not archive the request");
    }
  };

  const handleCancel = async (requestID, token) => {
    if(await deleteBookRequest(requestID, token)) {
      message.success('Request has been canceled')
      history.push("/book-requests");
    } else message.error('Could not cancel request')
  }

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
            <Button>
              <a href={`/book/${bookID}`}>Go to book</a>
            </Button>
            {canCancel && <Button onClick={() => handleCancel(requestID, token)} danger >Cancel</Button>}
            {canArchive && (
              <Button onClick={() => handleArchiving(requestID, token)} danger>
                Archive
              </Button>
            )}
            {canEdit && (
              <UpdateBookStatusModal
                bookID={bookID}
                initialStatus={bookStatus}
                ownerID={request.bookOwnerID}
                onSubmit={() => fetchRequest(requestID, token)}
              />
            )}
          </div>
        </div>
        <div className={styles.StatusBadge}>
          <StatusBadge status={status} />
        </div>
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
