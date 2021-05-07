//TODO
const React = require('react');
const Cookies = require('js-cookie');
const axios = require('axios');

export default class Listing extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      session: Cookies.get('session'),
    }
  }

  render() {
    return (
      <div className="listelement">
        <div>{this.props.username}#{this.props.discriminator}</div>
        <div>{this.props.userId}</div>
        <button>Contact</button>
      </div>
    );
  }

}