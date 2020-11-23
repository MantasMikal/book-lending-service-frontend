import React, { useContext } from "react";
import { Avatar, Menu } from "antd";
import { Link } from "react-router-dom";
import UserContext from "../../../contexts/user";
import {
  BookFilled,
  HomeFilled,
  NotificationOutlined,
  PlusOutlined,
  UserOutlined,
} from "@ant-design/icons";

import styles from "./Navigation.module.scss";

const { SubMenu } = Menu;

const Navigation = () => {
  const { logout, user } = useContext(UserContext);
  const { loggedIn, username } = user;
  return (
    <div className={styles.Navigation}>
      <Menu
        className={styles.MainMenu}
        mode="horizontal"
        defaultSelectedKeys={["1"]}
      >
        <Menu.Item icon={<HomeFilled />} key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        {loggedIn && (
          <>
            <Menu.Item icon={<BookFilled />} key="3">
              <Link to="/my-books">My Books</Link>
            </Menu.Item>
            <Menu.Item icon={<PlusOutlined />} key="2">
              <Link to="/add-book">Add book</Link>
            </Menu.Item>
            <Menu.Item key="Requests-SubMenu" icon={<NotificationOutlined />}>
              <Link to="/book-requests">Book requests</Link>
            </Menu.Item>
          </>
        )}
      </Menu>
      <Menu mode="horizontal">
        {loggedIn ? (
          <SubMenu
            key="SubMenu"
            icon={<Avatar className={styles.User} icon={<UserOutlined />} />}
            title={username}
          >
            <Menu.Item key="7" onClick={logout}>
              <Link to="/">Logout</Link>
            </Menu.Item>
          </SubMenu>
        ) : (
          <>
            <Menu.Item key="6">
              <Link to="/login">Login</Link>
            </Menu.Item>
            <Menu.Item key="5">
              <Link to="/register">Register</Link>
            </Menu.Item>
          </>
        )}
      </Menu>
    </div>
  );
};

export default Navigation;
