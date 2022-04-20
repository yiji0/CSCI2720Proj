import * as React from 'react';
import { All } from "./All";
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import 'bootstrap/dist/css/bootstrap.min.css';
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
      <Container>
      
        <Row><br/></Row>
        <Row><br/></Row>
        <Row><br/></Row>
        <Row><br/></Row>
        <Row><br/></Row>
        
        <Row>
          <Col></Col>
          <Col>   
          <div className="bg-light border">  
          <br/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        Username : &nbsp;
        <input type="text" name="uid" id="uid"/>
        
        <br/><br/>
        </div>
          </Col>
          <Col></Col>
        </Row>
        <Row>
        <Col></Col>
          <Col>
          <div className="border">  
          <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        Password &nbsp;: &nbsp;
        <input type="text" name="pwd" id="pwd"/>
        <br/><br/>
        </div>
        </Col>
          <Col></Col>
        </Row>
        <Row>
        <Col></Col>
          <Col>
          
          <div className="bg-light border"> 
          <br/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <Button type='submit' onClick={this.handleUserSubmit} variant="success">Login As User</Button>
        &nbsp;&nbsp;&nbsp;&nbsp;
        <Button type='submit' onClick={this.handleAdminSubmit} variant="outline-success">Login As Admin</Button>
        <br/><br/>
        </div>
        </Col>
          <Col></Col>
        </Row>
        
        
      </Container>
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
