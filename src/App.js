import React from 'react';
import { Layout, message } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './assets/scss/base.scss';

import Header from './components/Header'
import Account from './components/account';
import Home from './components/HomeLayout';

import UserContext from './contexts/user';
import BookLayout from './components/BookLayout';
import UserBooksLayout from './components/UserBooksLayout';
import EditBookLayout from './components/EditBookLayout';
import LoginForm from './components/LoginForm';
import RegistrationForm from './components/RegistrationForm';
import UserLayout from './components/Layout/UserLayout';

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
    localStorage.removeItem('user') // Remove any previous user data
    user.loggedIn = true;
    const userData = {...user, token: token}
    localStorage.setItem('user', JSON.stringify(userData))
    this.setState({user: userData});
  }

  logout() {
    localStorage.removeItem('user')
    message.success('Logged out')
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
              <Route path="/register" children={<RegistrationForm />} />
              <Route path="/login" children={<LoginForm />} />
              <Route path="/book/:bookId" children={<BookLayout />} />
              <Route path="/my-books/edit/:bookId" children={<EditBookLayout editView/>}/>
              <Route path="/my-books" children={<UserBooksLayout />} />
              <Route path="/add-book" children={<EditBookLayout />} />
              <Route path="/user/:userID" children={<UserLayout />} />
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
