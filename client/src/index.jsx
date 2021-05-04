// TODO
import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from './components/SignIn.jsx';
import Profile from './components/Profile.jsx';

const signInRoot = document.getElementById('root-signin')
const profileRoot = document.getElementById('root-profile')

if(signInRoot){
  ReactDOM.render(<SignIn />, signInRoot);
}else if(profileRoot){
  ReactDOM.render(<Profile />, profileRoot);
}