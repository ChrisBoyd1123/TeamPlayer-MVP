// TODO
const React = require('react');
const Cookies = require('js-cookie');
const axios = require('axios');

export default class Listing extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      session: Cookies.get('session')
    }
  }

  handleProfileLoad() {
    window.location.replace(`/playerProfile`)
  }

  render() {
    return (
      <div className="listing">
        <div><button onClick={this.handleProfileLoad}>Your Profile</button></div>
      </div>
    );
  }
}