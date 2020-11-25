import React, { useContext, useEffect, useState } from "react";

import styles from "./RequestsLayout.module.scss";
import Container from "../../Primitive/Container";
import { message, Tabs } from "antd";
import {
  deleteBookRequest,
  getUserRequests,
} from "../../../utilities/fetch-helpers";
import UserContext from "../../../contexts/user";
import RequestsList from "../../Common/RequestsList";

const RequestsLayout = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState({
    userRequests: [],
    incomingRequests: [],
    archive: []
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
      let archive = [];

      requests.forEach((request) => {
        const isRequester = request.requesterID === ID;
        const isReceiver = request.bookOwnerID === ID;

        if (isRequester) {
          if (request.isArchivedByRequester === 1) {
            archive.push(request);
          } else userRequests.push(request);
        }

        if (isReceiver) {
          if (request.isArchivedByReceiver === 1) {
            archive.push(request);
          } else incomingRequests.push(request);
        }
      });

      setRequests({ userRequests, incomingRequests, archive });
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

  const handleArchive = async (requestID) => {
    console.log("Archive book");
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
          <RequestsList
            isLoading={isLoading}
            requests={requests.incomingRequests}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Sent requests" key="2">
          <RequestsList
            isLoading={isLoading}
            requests={requests.userRequests}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="Archive" key="3">
          <RequestsList isLoading={isLoading} requests={requests.archive} />
        </Tabs.TabPane>
      </Tabs>
    </Container>
  );
};

RequestsLayout.propTypes = {};

export default RequestsLayout;
