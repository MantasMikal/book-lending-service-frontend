import React from 'react';
import { Layout, message } from 'antd';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import './assets/scss/base.scss';

import Header from './components/Common/Header'
import Account from './components/account';
import Home from './components/Layout/HomeLayout';
import UserContext from './contexts/user';
import BookLayout from './components/Layout/BookLayout';
import UserBooksLayout from './components/Layout/UserBooksLayout';
import EditBookLayout from './components/Layout/EditBookLayout';
import LoginForm from './components/Common/LoginForm';
import RegistrationForm from './components/Common/RegistrationForm';
import RequestsLayout from './components/Layout/RequestsLayout';
import RequestLayout from './components/Layout/RequestLayout';

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
              <Route path="/book-requests/:requestId" children={<RequestLayout />} />
              <Route path="/book-requests" children={<RequestsLayout />} />
              <Route path="/" children={<Home />} exact />
            </Switch>
          </Content>
        </Router>
      </UserContext.Provider>  
    );
  }
}

export default App;
