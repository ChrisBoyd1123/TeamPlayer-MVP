import { useEffect } from 'react';

// TODO
const React = require('react');
const Cookies = require('js-cookie');
const axios = require('axios');

//utilize local server to find user data
//by saved session.

export default class Profile extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      session: Cookies.get('session'),
      username: null,
      discriminator: null,
      avatar: null,
    }

    this.handleLoadUser = this.handleLoadUser.bind(this);
    
    this.handleLoadUser();
  }

  async handleLoadUser() {
    const config = {
      method: 'get',
      url: `/userData`
    };
    const { data } = await axios(config)

    console.log(data);

    this.setState({username: data.username});
    this.setState({discriminator: 
    data.discriminator.length === 4 ?
    data.discriminator :
    '0'+data.discriminator})
    this.setState({avatar: data.avatar !== 'null' ?
    data.avatar :
    'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'})
    }

  render() {
    return (
      <div className="profile">
        <div><img src={this.state.avatar}></img></div>
        <div>{this.state.username}#{this.state.discriminator}</div>
      </div>
    );
  }
}