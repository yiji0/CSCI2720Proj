import * as React from 'react';
import { All } from "./All";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { login: false };
  }


  handleSubmit = (event) => {
    const uid = document.getElementById("uid").value;
    const pwd = document.getElementById("pwd").value;
    const userinfo = {
      uid: uid,
      pwd: pwd
    };
    fetch("http://localhost:8000/login", {
      method: "POST",
      body: JSON.stringify(userinfo),
      headers: {
        'Content-Type': 'application/json'
      },
    })
    .then(res => {
      if (res.status == 200) {
        this.setState({login: true});
      }
      return res.text();
    })
    .then(data => alert(data))
    .catch(err => {
      console.log(err);
    });
    event.preventDefault();
  }

  render() {
    return (
      this.state.login == false ? (
        <div>
          <h1>Login</h1>
          <div>
            <form onSubmit={this.handleSubmit}>
              <label>
                Account ID : &nbsp;
                <input type="text" name="uid" id="uid" />
              </label>
              <br /><br />
              <label>
                Password : &nbsp;
                <input type="text" name="pwd" id="pwd" />
              </label>
              <br /><br />
              <input type="submit" value="Submit" />
            </form>
          </div>
        </div>
      ) : <All />
    );
  }
}
export default Login;
