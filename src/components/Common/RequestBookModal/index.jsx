import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import styles from "./RequestBookModal.module.scss";
import Modal from "antd/lib/modal/Modal";
import TextArea from "antd/lib/input/TextArea";
import { Button, message } from "antd";
import { requestBook } from "../../../utilities/fetch-helpers";
import UserContext from "../../../contexts/user";

const RequestBookModal = ({ title, bookID, onSubmit }) => {
  const [isVisible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(false)
  const [requestMessage, setRequestMessage] = useState('')
  const { user } = useContext(UserContext);
  const { ID, token } = user; 

  const handleSubmit = async () => {
    setLoading(true)
    const data = {
      title: title,
      bookID: bookID,
      requesterID: ID
    }
    const response = await requestBook(data, token)
    console.log("🚀 ~ file: index.jsx ~ line 26 ~ RequestBookModal ~ response", response)
    
    if(!response || response.rejected) {
      message.error(`Could not request book. ${response.info || ''}`,)
    } else {
      message.success('Book successfully requested')
    }

    setVisible(false)
    setLoading(false)
    onSubmit()
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
        <TextArea onChange={(e) => setRequestMessage(e.target.value)} placeholder="Enter a short message to the book owner" />
      </Modal>
    </>
  );
};

RequestBookModal.propTypes = {};

export default RequestBookModal;
