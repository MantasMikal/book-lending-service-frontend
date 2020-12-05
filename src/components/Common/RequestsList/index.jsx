import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

import { UserOutlined } from "@ant-design/icons";
import Avatar from "antd/lib/avatar/avatar";
import { Button, List } from "antd";
import Text from "antd/lib/typography/Text";
import StatusBadge from "../../Primitive/Badge";

import styles from "./RequestsList.module.scss";

/**
 * Lists user requests 
 */
const RequestsList = ({ requests, isLoading, onCancel, onArchive }) => (
  <List
    loading={isLoading}
    itemLayout="horizontal"
    dataSource={requests}
    renderItem={(request) => {
      const { dateCreated, title, status, ID } = request;
      const formattedDate = moment
        .utc(dateCreated)
        .local()
        .format("MM/DD/YYYY, h:mm a")
        .toString();
      return (
        <List.Item
          actions={[
            onCancel && <Button danger onClick={() => onCancel(ID)}>Cancel Request</Button>,
            onArchive && <Button danger onClick={() => onArchive(ID)}>Archive</Button>
          ]}
        >
          <List.Item.Meta
            className={styles.Meta}
            avatar={<Avatar icon={<UserOutlined />} />}
            title={<a href={`/book-requests/${ID}`}>{title}</a>}
            description={
              <a
                href={`/book-requests/${ID}`}
                className={styles.RequestDetails}
              >
                <Text>{formattedDate}</Text>
              </a>
            }
          />
          <StatusBadge status={status} />
        </List.Item>
      );
    }}
  />
);

RequestsList.propTypes = {
  requests: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool,
  onCancel: PropTypes.func
};

export default RequestsList;
