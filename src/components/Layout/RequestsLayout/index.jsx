import React, { useContext, useEffect, useState } from "react";
import cn from "classnames";
import PropTypes from "prop-types";
import styles from "./RequestsLayout.module.scss";
import Container from "../../Primitive/Container";
import Avatar from "antd/lib/avatar/avatar";
import { List, message, Tabs } from "antd";
import { UserOutlined } from "@ant-design/icons";
import Paragraph from "antd/lib/typography/Paragraph";
import Text from "antd/lib/typography/Text";
import { getUserRequests } from "../../../utilities/fetch-helpers";
import UserContext from "../../../contexts/user";

// const requests = [
//   {
//     ID: 1,
//     title: "Request to Mantas",
//     dateRequested: "12/23/2020",
//     bookTitle: "12 Rules for life",
//     status: "Requested",
//     messages: [
//       {
//         from: "mantas2",
//         to: "mantas",
//         timestamp: "12/23/2020",
//         message: "Hello buddy",
//       },
//       {
//         from: "mantas",
//         to: "mantas2",
//         timestamp: "12/23/2020",
//         message: "Hello",
//       },
//     ],
//   },
//   {
//     title: "Request from Mantas",
//     dateRequested: "12/23/2020",
//     bookTitle: "12 Rules for life",
//     status: "On Loan",
//   },
//   {
//     title: "Request to Mantas",
//     dateRequested: "12/23/2020",
//     bookTitle: "12 Rules for life",
//     status: "Requested",
//   },
//   {
//     title: "Request to Mantas",
//     dateRequested: "12/23/2020",
//     bookTitle: "12 Rules for life",
//     status: "Requested",
//   },
// ];

const RequestsLayout = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [requests, setRequests] = useState({userRequests: [], incomingRequests: []});
  const { user } = useContext(UserContext);
  console.log("🚀 ~ file: index.jsx ~ line 60 ~ RequestsLayout ~ requests", requests)
  const { ID, token } = user;

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      const requests = await getUserRequests(ID, token);
      if (requests) {
        let userRequests = []
        let incomingRequests = []
        requests.forEach((request) => {
          if(request.requesterID === ID) userRequests.push(request)
          else incomingRequests.push(request)
        })
        setRequests({userRequests, incomingRequests});
      } else {
        message.error("Could not retrieve user requests");
      }
      setIsLoading(false);
    };

    fetchData();
  }, [ID, token]);

  return (
    <Container
      gutter
      fullHeight
      className={styles.RequestsLayout}
    >
      <Tabs tabPosition='top' size='small' defaultActiveKey="1" onChange={() => {}}>
        <Tabs.TabPane tab="Incoming requests" key="1">
          <Requests isLoading={isLoading} requests={requests.incomingRequests} />
        </Tabs.TabPane>
        <Tabs.TabPane tab="My requests" key="2">
          <Requests isLoading={isLoading} requests={requests.userRequests} />
        </Tabs.TabPane>
      </Tabs>
    </Container>
  );
};

RequestsLayout.propTypes = {};

const Requests = ({requests, isLoading}) => (
  <div className={styles.Requests}>
    <List
      loading={isLoading}
      itemLayout="horizontal"
      dataSource={requests}
      renderItem={(request) => (
        <a href={`/book-requests/${request.ID}`}>
          <List.Item>
            <List.Item.Meta
              avatar={<Avatar icon={<UserOutlined />} />}
              title={request.title}
              description={
                <div className={styles.RequestDetails}>
                  <Text>{request.dateCreated}</Text>
                </div>
              }
            />
          </List.Item>
        </a>
      )}
    />
  </div>
);

export default RequestsLayout;
