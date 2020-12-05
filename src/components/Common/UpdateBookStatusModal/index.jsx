import React, { useContext, useState } from "react";
import PropTypes from "prop-types";
import UserContext from "../../../contexts/user";

import Modal from "antd/lib/modal/Modal";
import { Button, message, Radio } from "antd";
import { updateBookStatus } from "../../../utilities/fetch-helpers";

import styles from "./UpdateBookStatusModal.module.scss";

/**
 * A modal for updating book status
 */
const UpdateBookStatusModal = ({ initialStatus, bookID, onSubmit }) => {
  const [isVisible, setVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const [status, setStatus] = useState("");
  const { user } = useContext(UserContext);
  const { token } = user;

  const handleSubmit = async () => {
    setLoading(true);
    const data = {
      status: status,
    };
    if (await updateBookStatus(bookID, data, token)) {
      message.success("Book status successfully requested");
    } else {
      message.error("Could not update book status");
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
        className={styles.UpdateStatusButton}
        loading={isLoading}
      >
        Update status
      </Button>
      <Modal
        title="Update book status"
        visible={isVisible}
        confirmLoading={isLoading}
        onOk={handleSubmit}
        onCancel={() => setVisible(false)}
      >
        <Radio.Group
          onChange={(e) => setStatus(e.target.value)}
          defaultValue={initialStatus}
        >
          <Radio className={styles.Radio} value={"Available"}>
            Available
          </Radio>
          <Radio className={styles.Radio} value={"Requested"}>
            Requested
          </Radio>
          <Radio className={styles.Radio} value={"On Loan"}>
            On Loan
          </Radio>
        </Radio.Group>
      </Modal>
    </>
  );
};

UpdateBookStatusModal.propTypes = {
  initialStatus: PropTypes.oneOf(["Available", "On Loan", "Requested"])
    .isRequired,
  bookID: PropTypes.number.isRequired,
  onSubmit: PropTypes.func,
};

export default UpdateBookStatusModal;
