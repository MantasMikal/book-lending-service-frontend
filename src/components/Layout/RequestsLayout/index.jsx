import React, { useContext, useEffect, useState } from "react";
import moment from "moment";
import PropTypes from "prop-types";
import styles from "./RequestsLayout.module.scss";
import Container from "../../Primitive/Container";
import Avatar from "antd/lib/avatar/avatar";
import { Button, List, message, Tabs } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Text from "antd/lib/typography/Text";
import {
  deleteBookRequest,
  getUserRequests,
} from "../../../utilities/fetch-helpers";
import UserContext from "../../../contexts/user";

const RequestsLayout = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState({
    userRequests: [],
    incomingRequests: [],
  });
  const { user } = useContext(UserContext);
  const { ID, token } = user;

  useEffect(() => {
    setIsLoading(true);
    fetchRequests(ID, token);
    setIsLoading(false);
  }, [ID, token]);

  const fetchRequests = async (ID, token) => {
    const requests = await getUserRequests(ID, token);
    if (requests) {
      let userRequests = [];
      let incomingRequests = [];
      requests.forEach((request) => {
        if (request.requesterID === ID) userRequests.push(request);
        else incomingRequests.push(request);
      });
      setRequests({ userRequests, incomingRequests });
    } else {
      message.error("Could not retrieve user requests");
    }
  };

  const handleDelete = async (requestID) => {
    if (await deleteBookRequest(requestID)) {
      message.success("Request deleted");
    } else {
      message.error("Could not delete request");
    }
    fetchRequests(ID, token);
  };

  return (
    <Container gutter fullHeight className={styles.RequestsLayout}>
      <Tabs
        tabPosition="top"
        size="small"
        defaultActiveKey="1"
        onChange={() => {}}
      >
        <Tabs.TabPane tab="Incoming requests" key="1">
          <Requests
            isLoading={isLoading}
            requests={requests.incomingRequests}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="My requests" key="2">
          <Requests
            isLoading={isLoading}
            requests={requests.userRequests}
            onCancel={handleDelete}
          />
        </Tabs.TabPane>
      </Tabs>
    </Container>
  );
};

RequestsLayout.propTypes = {};

const Requests = ({ requests, isLoading, onCancel }) => {
  return (
    <div className={styles.Requests}>
      <List
        loading={isLoading}
        itemLayout="horizontal"
        dataSource={requests}
        renderItem={(request) => {
          const { dateCreated, title, ID } = request;
          const formattedDate = moment
            .utc(dateCreated)
            .local()
            .format("MM/DD/YYYY, h:mm a")
            .toString();
          return (
            <List.Item
              actions={[
                onCancel && (
                  <Button onClick={() => onCancel(ID)}>Cancel</Button>
                ),
              ]}
            >
              <List.Item.Meta
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
            </List.Item>
          );
        }}
      />
    </div>
  );
};

export default RequestsLayout;
