import React, { useState } from "react";
import { Layout, message } from "antd";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Header from "./components/Common/Header";
import Home from "./components/Layout/HomeLayout";
import UserContext from "./contexts/user";
import BookLayout from "./components/Layout/BookLayout";
import UserBooksLayout from "./components/Layout/UserBooksLayout";
import EditBookLayout from "./components/Layout/EditBookLayout";
import RequestsLayout from "./components/Layout/RequestsLayout";
import RequestLayout from "./components/Layout/RequestLayout";
import UserLayout from "./components/Layout/UserLayout";
import LoginLayout from "./components/Layout/LoginLayout";
import RegistrationLayout from "./components/Layout/RegistrationLayout";

import "./assets/scss/base.scss";

const { Content } = Layout;

const App = () => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || { loggedIn: false }
  );

  const login = (user, token) => {
    localStorage.removeItem("user"); // Remove any previous user data
    user.loggedIn = true;
    const userData = { ...user, token: token };
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    message.success("Logged out");
    setUser({ loggedIn: false });
  };

  const context = {
    user: user,
    login: login,
    logout: logout,
  };

  return (
    <UserContext.Provider value={context}>
      <Router>
        <Header />
        <Content>
          <Switch>
            <Route path="/register" children={<RegistrationLayout />} />
            <Route path="/login" children={<LoginLayout />} />
            <Route path="/book/:bookID" children={<BookLayout />} />
            <Route
              path="/my-books/edit/:bookID"
              children={<EditBookLayout editView />}
            />
            <Route path="/my-books" children={<UserBooksLayout />} />
            <Route path="/add-book" children={<EditBookLayout />} />
            <Route
              path="/book-requests/:requestID"
              children={<RequestLayout />}
            />
            <Route path="/book-requests" children={<RequestsLayout />} />
            <Route path="/user/:userID" children={<UserLayout />} />
            <Route path="/" children={<Home />} exact />
          </Switch>
        </Content>
      </Router>
    </UserContext.Provider>
  );
};

export default App;
