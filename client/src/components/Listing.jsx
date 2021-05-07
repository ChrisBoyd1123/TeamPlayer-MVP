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

    this.handleUWSGLoad();
  }

  async handleUWSGLoad() {

    const config = {
      method: 'get',
      url: `/usersWithSimilarGames`
    };

    const { data } = await axios(config)

    console.log('Possible returned UWSG', data.UWSG);

    if(data.UWSG){
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

  render() {
    return (
      <div className="listing">
        <div><button onClick={this.handleProfileLoad}>Your Profile</button></div>
        {this.state.users.map((item) => { return <Listelement username={item.split('|')[0]} discriminator={item.split('|')[1]} userId={item.split('|')[2]}></Listelement>})}
      </div>
    );
  }
}