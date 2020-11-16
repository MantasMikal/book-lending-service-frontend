import React from 'react';
import UserContext from '../contexts/user';


function Account(props) {
  return (
    <>
    <UserContext.Consumer>
      {({user}) => {console.log("current user in UserContext is", user)}}
    </UserContext.Consumer>
    <h1>Account</h1>
    <p>This is where account information will be displayed</p>
    </>
  );
}

export default Account;
