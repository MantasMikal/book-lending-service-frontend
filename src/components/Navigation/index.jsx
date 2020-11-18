import React, { useContext } from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";
import UserContext from "../../contexts/user";

import styles from './Navigation.module.scss'

const Navigation = () => {
  const {logout} = useContext(UserContext);
  return (
    <div className={styles.Navigation}>
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["1"]}>
        <Menu.Item key="1">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="2">
          <Link to="/account">Account</Link>
        </Menu.Item>
        <Menu.Item key="3">
          <Link to="/my-books">My Books</Link>
        </Menu.Item>
        <Menu.Item key="4">
          <Link to="/add-book">Add book</Link>
        </Menu.Item>
        <Menu.Item key="5">
          <Link to="/register">Register</Link>
        </Menu.Item>
        <Menu.Item key="6">
          <Link to="/login">Login</Link>
        </Menu.Item>
        <Menu.Item key="7" onClick={logout}>
          <Link to="/">Logout</Link>
        </Menu.Item>
      </Menu>
    </div>
  );
};

export default Navigation;
