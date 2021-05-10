// TODO
import Listelement from './Listelement.jsx';

const React = require('react');
const Cookies = require('js-cookie');
const axios = require('axios');

export default class Listing extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      session: Cookies.get('session'),
      users: [`no-one's|here!|:(`],
    }

    this.handleUWSGLoad = this.handleUWSGLoad.bind(this);
    this.handleGameSearch = this.handleGameSearch.bind(this);

    this.handleUWSGLoad();
  }

  async handleUWSGLoad() {

    const config = {
      method: 'get',
      url: `/usersWithSimilarGames`
    };

    const { data } = await axios(config)

    if(data.UWSG && data.UWSG.length){
      let foundUsernames = [];
      let foundDiscriminators = [];
      let foundUserIds = [];

      let foundUsers = [];

      data.UWSG.forEach((userObj, uOIndex) => {
        foundUsernames.push(userObj.username);
        foundDiscriminators.push(userObj.discriminator);
        foundUserIds.push(userObj.userId);
      })

      foundUsernames.forEach((username, uIndex) => {
        foundUsers.push(`${username}|${foundDiscriminators[uIndex]}|${foundUserIds[uIndex]}`);
      })

      this.setState({users: foundUsers});
    }

  }

  handleProfileLoad() {
    window.location.replace(`/playerProfile`)
  }

  async handleGameSearch() {
    //Should send a POST request to app server with a game name,
    //before receiving an array of user objects corresponding
    //to the users that have the same game saved.

    const searchedGame = document.getElementById('search-bar').value;

    if(searchedGame){
      const sendData = JSON.stringify(
        {"gameName":searchedGame});
      
      const config = {
        method: 'post',
        url: `/usersWithSearchedGame`,
        headers: {
          'Content-Type': 'application/json'
        },
        data : sendData
      };

      let { data } = await axios(config)

      if(data.UWG && data.UWG.length){
        let foundUsernames = [];
        let foundDiscriminators = [];
        let foundUserIds = [];
  
        let foundUsers = [];
  
        data.UWG.forEach((userObj, uOIndex) => {
          foundUsernames.push(userObj.username);
          foundDiscriminators.push(userObj.discriminator);
          foundUserIds.push(userObj.userId);
        })
  
        foundUsernames.forEach((username, uIndex) => {
          foundUsers.push(`${username}|${foundDiscriminators[uIndex]}|${foundUserIds[uIndex]}`);
        })
  
        this.setState({users: foundUsers});
      }
    }
  }

  render() {
    return (
      <div className="listing">
        <div><button onClick={this.handleProfileLoad}>Your Profile</button></div>
        <div>
        <input id="search-bar"></input>
        <button id="search-enter" onClick={this.handleGameSearch}>Enter</button>
        </div>
        {this.state.users.map((item) => { return <Listelement username={item.split('|')[0]} discriminator={item.split('|')[1]} userId={item.split('|')[2]}></Listelement>})}
      </div>
    );
  }
}