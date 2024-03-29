import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import styles from "./RequestBookModal.module.scss";
import Modal from "antd/lib/modal/Modal";
import TextArea from "antd/lib/input/TextArea";
import { Button, message } from "antd";
import { requestBook, sendMessage } from "../../../utilities/fetch-helpers";
import UserContext from "../../../contexts/user";

/**
 * A modal for requesting a book.
 */
const RequestBookModal = ({ title, bookID, ownerID, onSubmit }) => {
  const [isVisible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [requestMessage, setRequestMessage] = useState("");
  const { user } = useContext(UserContext);
  const { ID, token } = user;

  const handleSubmit = async () => {
    setLoading(true);
    const data = {
      title: title,
      bookID: bookID,
      requesterID: ID,
    };

    const response = await requestBook(data, token);
    if (!response || !response.created) {
      message.error(`Could not request book. ${response.info || ""}`);
    } else {
      // Just make a request if no message
      if(requestMessage.length < 1) {
        message.success("Book successfully requested");
        setVisible(false);
        setLoading(false);
        onSubmit();
        return
      }

      const requestID = response.ID;
      const messageToSend = {
        message: requestMessage,
        senderID: ID,
        receiverID: ownerID,
        requestID: requestID,
      };
      if (await sendMessage(token, messageToSend)) {
        message.success("Book successfully requested");
      } else {
        message.warning(
          "Book successfully requested, but message could not be sent."
        );
      }
    }
  
    setVisible(false);
    setLoading(false);
    onSubmit();
  };

  return (
    <>
      <Button
        type="primary"
        onClick={() => setVisible(true)}
        className={styles.RequestButton}
        loading={isLoading}
      >
        Request
      </Button>
      <Modal
        title={title}
        visible={isVisible}
        confirmLoading={isLoading}
        onOk={handleSubmit}
        onCancel={() => setVisible(false)}
      >
        <TextArea
          onChange={(e) => setRequestMessage(e.target.value)}
          placeholder="Enter a short message to the book owner"
        />
      </Modal>
    </>
  );
};

RequestBookModal.propTypes = {
  title: PropTypes.string.isRequired,
  bookID: PropTypes.number.isRequired,
  ownerID: PropTypes.number.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default RequestBookModal;
