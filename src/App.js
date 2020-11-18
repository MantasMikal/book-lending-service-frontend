import React from 'react';
import { Layout } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './assets/scss/base.scss';

import Header from './components/Header'
import Account from './components/account';
import Register from './components/register';
import Login from './components/login';
import Home from './components/HomeLayout';

import UserContext from './contexts/user';
import BookLayout from './components/BookLayout';
import UserBooksLayout from './components/UserBooksLayout';
import EditBookLayout from './components/EditBookLayout';

const { Content, Footer } = Layout;


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user: JSON.parse(localStorage.getItem('user')) || {loggedIn: false}
    }

    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login(user, token) {
    console.log("User is now being set on the context");
    user.loggedIn = true;
    const userData = {...user, token: token}
    localStorage.setItem('user', JSON.stringify(userData))
    this.setState(userData);
  }

  logout() {
    console.log("Removing user from the app context");
    localStorage.removeItem('user')
    this.setState({user: {loggedIn:false}});
  }

  render () {
    const context = {
      user: this.state.user,
      login: this.login,
      logout: this.logout
    };

    console.log('USER: ', this.state.user)

    return (
      <UserContext.Provider value={context}>
        <Router>
          <Header />
          <Content>
            <Switch>
              <Route path="/account" children={<Account />} />
              <Route path="/register" children={<Register />} />
              <Route path="/login" children={<Login />} />
              <Route path="/book/:id" children={<BookLayout />} />
              <Route path="/my-books" children={<UserBooksLayout />} />
              <Route path="/add-book" children={<EditBookLayout />} />
              <Route path="/edit-book/:bookId" children={<EditBookLayout editView/>} />
              <Route path="/" children={<Home />} exact />
            </Switch>
          </Content>

          <Footer style={{ textAlign: 'center' }}>Created for 304CEM</Footer>

        </Router>
      </UserContext.Provider>  
    );
  }
}

export default App;
