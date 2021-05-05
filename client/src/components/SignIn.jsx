// TODO
const React = require('react');
const axios = require('axios');

export default class SignIn extends React.Component{
  constructor(props) {
    super(props);

    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    const submittedUser = document.getElementById("usernameInput").value;
    const submittedKey = document.getElementById("keyInput").value;

    const data = JSON.stringify(
      {"username":submittedUser,
      "key":submittedKey});
    
    const config = {
      method: 'post',
      url: `http://${process.env.IP}:${process.env.PORT}/signingIn`,
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };

    //TODO: Find way to reload page after acquiring session from
    //server /signingIn route.
    axios(config)
    .then(() => {
      window.location.replace(`http://${process.env.IP}:${process.env.PORT}/`);
    })
    .catch(function (err) {
      console.log(err);
    });
  }

  render() {
    return (
      <div className="signin">
        <div>lol</div>
        <div>
        <input type="text" id='usernameInput'></input>
        <input type="text" id='keyInput'></input>
        <button onClick={this.handleSubmit} id='submitButton'>Enter</button>
        </div>
      </div>
    );
  }
}