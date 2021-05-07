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
      games: ['Use the input below to add games!'],
    }

    this.handleLoadUser = this.handleLoadUser.bind(this);
    this.handleLoadGames = this.handleLoadGames.bind(this);
    this.handleGameSubmit = this.handleGameSubmit.bind(this);
    
    this.handleLoadUser();
    this.handleLoadGames();
  }

  async handleLoadUser() {
    const config = {
      method: 'get',
      url: `/userData`
    };
    const { data } = await axios(config)

    this.setState({username: data.username});
    this.setState({discriminator: 
    data.discriminator.length === 4 ?
    data.discriminator :
    '0'+data.discriminator})
    this.setState({avatar: data.avatar !== 'null' ?
    data.avatar :
    'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'})
    }

    async handleLoadGames() {
      const config = {
        method: 'get',
        url: `/userGames`
      };

      const { data } = await axios(config)

      if(data.userGames){
        this.setState({games: data.userGames});
      }
    }

    handleGameSubmit() {
      const submittedGame = document.getElementById("gameInput").value;

      if(submittedGame){
        const data = JSON.stringify(
          {"gameName":submittedGame});
        
        const config = {
          method: 'post',
          url: `/newGame`,
          headers: {
            'Content-Type': 'application/json'
          },
          data : data
        };

        axios(config)
        .then(() => {
          window.location.replace(`/`);
        })
        .catch(function (err) {
          console.log(err);
        });
      }
    }

  render() {
    return (
      <div className="profile">
        <div><img src={this.state.avatar}></img></div>
        <div>{this.state.username}#{this.state.discriminator}</div>
        <div>{this.state.games.map(item => <div> {item} </div>)}</div>
        <div>
        <input type="text" id='gameInput'></input>
        <button onClick={this.handleGameSubmit} id='submitButton'>Enter</button></div>
      </div>
    );
  }
}