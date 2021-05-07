// TODO
import React from 'react';
import ReactDOM from 'react-dom';
import SignIn from './components/SignIn.jsx';
import Profile from './components/Profile.jsx';
import Listing from './components/Listing.jsx';

const signInRoot = document.getElementById('root-signin')
const profileRoot = document.getElementById('root-profile')
const listingRoot = document.getElementById('root-listing')

if(signInRoot){
  ReactDOM.render(<SignIn />, signInRoot);
}else if(profileRoot){
  ReactDOM.render(<Profile />, profileRoot);
}else if(listingRoot){
  ReactDOM.render(<Listing />, listingRoot);
}