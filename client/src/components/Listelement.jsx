//TODO
const React = require('react');
const Cookies = require('js-cookie');
const axios = require('axios');

export default class Listing extends React.PureComponent{
  constructor(props) {
    super(props);

    this.state = {
      session: Cookies.get('session'),
      lobbyMade: false,
    }

    this.handleServerLobbyRequest = this.handleServerLobbyRequest.bind(this);
  }

  handleServerLobbyRequest() {
    const context = this;

    const data = JSON.stringify(
      {"userId": context.props.userId});
      
    const config = {
      method: 'post',
      url: `/createLobby`,
      headers: {
        'Content-Type': 'application/json'
      },
      data : data
    };

    if(!this.state.lobbyMade){
      axios(config)
      .then(() => {
        context.setState({lobbyMade: true});
      })
    }
  }

  render() {
    return (
      <div className="listelement">
        <div>{this.props.username}#{this.props.discriminator}</div>
        <button onClick={this.handleServerLobbyRequest}>Contact</button>
      </div>
    );
  }

}