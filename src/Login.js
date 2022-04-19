import * as React from 'react';
import { All } from "./All";
class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { login: false };
  }


  handleUserSubmit = (event) => {
    const uid = document.getElementById("uid").value;
    const pwd = document.getElementById("pwd").value;
    const userinfo = {
      uid: uid,
      pwd: pwd
    };
    fetch("http://localhost:8000/login/user", {
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
  
  handleAdminSubmit = (event) => {
    const uid = document.getElementById("uid").value;
    const pwd = document.getElementById("pwd").value;
    const userinfo = {
      uid: uid,
      pwd: pwd
    };
    fetch("http://localhost:8000/login/admin", {
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
    return ( this.state.login == false ? (
      <div>
        Username : &nbsp;
        <input type="text" name="uid" id="uid"/>
        <br/><br/>
        Password : &nbsp;
        <input type="text" name="pwd" id="pwd"/>
        <br/><br/>
        <button type='submit' onClick={this.handleUserSubmit}>Login As User</button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <button type='submit' onClick={this.handleAdminSubmit}>Login As Admin</button>
      </div>
    ) : <All />
    );
  }

/*  render() {
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
  }*/
}
export default Login;
