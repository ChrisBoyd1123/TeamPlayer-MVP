// TODO
const React = require('react');
const Cookies = require('js-cookie');

//utilize local server to find user data
//by saved session.

export default class Profile extends React.Component{
  constructor(props) {
    super(props);

    this.state = {
      session: Cookies.get('session')
    }
  }

  render() {
    return (
      <div className="profile">
        {this.state.session}
      </div>
    );
  }
}