import * as React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
import sha256 from 'crypto-js/sha256';
import cookie from 'react-cookies';
import {Navigate} from 'react-router-dom';


export const getloginfo = () => {
  return cookie.load('userInfo');
};

export const login = (uid, mode) => {
  cookie.save('userInfo', { uid, mode }, { path: '/', maxAge: 3600 });
};

export const logout = () => {
  cookie.remove('userInfo');
};

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = { login: false, uid:undefined, mode:'user'};
  }

  handleUserSubmit = (event) => {
    const uid = document.getElementById("uid").value;
    const pwd = document.getElementById("pwd").value;
    const userinfo = {
      uid: uid,
      pwd: sha256(pwd).toString()
    };
    fetch("http://localhost:8000/login/user", {
      method: "POST",
      body: JSON.stringify(userinfo),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => {
        if (res.status === 200) {
          this.setState({ login: true, uid: uid, mode:'user'});
          login(uid, 'user');
          this.props.onChangeLogin();
        }
        return res.text();
      })
      .then(data => alert(data))
      .catch(err => {
        console.log(err);
      });
    event.preventDefault();
  };

  handleAdminSubmit = (event) => {
    const uid = document.getElementById("uid").value;
    const pwd = document.getElementById("pwd").value;
    const userinfo = {
      uid: uid,
      pwd: sha256(pwd).toString()
    };
    console.log(userinfo);
    fetch("http://localhost:8000/login/admin", {
      method: "POST",
      body: JSON.stringify(userinfo),
      headers: {
        'Content-Type': 'application/json'
      },
    })
      .then(res => {
        if (res.status === 200) {
          this.setState({ login: true, uid: uid, mode:'admin'});
          login(uid, 'admin');
          this.props.onChangeLogin();
        }
        return res.text();
      })
      .then(data => alert(data))
      .catch(err => {
        console.log(err);
      });
    event.preventDefault();
  };
  
  render() {
    return (this.state.login === false ? (
      <Container fluid>
        <Row><br /></Row>
        <Row><br /></Row>
        <Row><br /></Row>
        <Row><br /></Row>
        <Row><br /></Row>

        <Row>
          <Col></Col>
          <Col>
            <div className="bg-light border" style={{textAlign: "center", minWidth:"250px"}}>
              <br /> 
              Username : &nbsp;
              <input type="text" name="uid" id="uid" />

              <br /><br />
            </div>
          </Col>
          <Col></Col>
        </Row>
        <Row>
          <Col></Col>
          <Col>
            <div className="border" style={{textAlign: "center", minWidth:"250px"}}>
              <br />
              Password &nbsp;: &nbsp;
              <input type="password" name="pwd" id="pwd" />
              <br /><br />
            </div>
          </Col>
          <Col></Col>
        </Row>
        <Row>
        
        <Col></Col>
          <Col>
          
            <div className="bg-light border" style={{textAlign: "center", minWidth:"250px"}}>
              <br />
              <Button type='submit' onClick={this.handleUserSubmit} variant="success">&nbsp;&nbsp;Login As User&nbsp;&nbsp;</Button>
             
              
              <br /><br />
            </div>
            <div className="border" style={{textAlign: "center", minWidth:"250px"}}>
            <br />
            <Button type='submit' onClick={this.handleAdminSubmit} variant="outline-success">Login As Admin</Button>
            <br /><br />
            </div>
            </Col>
          <Col></Col>
         
          
        </Row>
      </Container>
    ) : (this.state.mode === 'user' ? <Navigate to='/all'/> : <Navigate to='/all_adm'/>)
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
export { Login };