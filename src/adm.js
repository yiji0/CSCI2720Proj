import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import { getloginfo } from './Login'
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

class All_adm extends React.Component {
  state = {
    location: []
  }

  async fetchLoc(){
    let res = await fetch('http://localhost:8000/loc1',{
      method:'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    let l = await res.json();
    await this.setState({location: l});
  }

  componentDidMount(){
    this.fetchLoc()
  }

  refreshData(){
    fetch('http://localhost:8000/weather',{
      method:'PUT',
    }).then(res=>res.text()).then(msg=>alert(msg));
  }

  async createLoc(){
    
    let newLocObj = {
      name: document.querySelector('#newLocName').value,
      lon: document.getElementById('newlon').value,
      lat: document.getElementById('newlat').value
    };

    // console.log(newLocObj)
    
    let createNewLoc = await fetch('http://localhost:8000/create_loc',{
      method: 'POST',
      headers:{
          'Content-Type': 'application/json'
      },
      body: JSON.stringify(newLocObj)
    });
    let msg = await createNewLoc.text();
    alert(msg);
  }

  render() {
    return (
      <>
      
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to='/all_adm'>Location List</Link></Navbar.Brand>
          <Navbar.Brand><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to='/user_adm'>User List</Link></Navbar.Brand>
          
          <Nav className="me-auto">
          <Nav.Link>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Nav.Link>
          <Nav.Link><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to='/'>{this.props.islogin ? (getloginfo()['uid'] + "\tLog out") : "Log in"}</Link></Nav.Link>
            
          </Nav>
        </Container>
        </Navbar>
        <div className="container">
          <Table bordered striped hover id="locationlist">
            <thead>
              <tr>
                <th>CityName </th>
                <th>Longitude </th>
                <th>Latitude </th>
                <th> </th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
            {this.state.location.map((loc, index) => <LocInfo data={loc} i={index} key={index} />)}
            <tr>
              <td><input type="text" id="newLocName" placeholder='New Location Name'/></td>
              <td><input type="text" id="newlon" placeholder='Longitude'/></td>
              <td><input type="text" id="newlat" placeholder='Latitude'/></td>
              <td><button type='button'className="btn btn-outline-success me-2" onClick={this.createLoc}>Create</button></td>
            </tr>
            </tbody>
          </Table>
        </div>
        <Container>
          <button className="btn btn-outline-success me-2" onClick={this.refreshData}>Refresh Weather Data</button>
        </Container>
      </>
    );
  }
}


class LocInfo extends React.Component {
  render() {
    let i = this.props.i;
    let data = this.props.data;
    return (
      <tr>
        <td><Link to={'/' + data.name}>{data.name}</Link></td>
        <td>{data.lon}</td>
        <td>{data.lat}</td>
        <td><button className="btn btn-outline-success me-2">delete</button></td>
        <td><button className="btn btn-outline-success me-2">update</button></td>
      </tr>
    )
  }
}

class Getuser extends React.Component {
  render() {
    let i = this.props.i;
    let data = this.props.data;
    return (
      <tr>
        <td>{data.id}</td>
        <td>{data.pwd}</td>
        <td><button className="btn btn-outline-success me-2">delete</button></td>
        <td><button className="btn btn-outline-success me-2">update</button></td>
      </tr>
    )
  }
}

class User_adm extends React.Component {
  state = {
    user: []
  }

  async fetchuser(){
    let res = await fetch('http://localhost:8000/user',{
      method:'GET',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    let l = await res.json();
    await this.setState({user: l});
    console.log(this.state.user);
  }

  componentDidMount(){
    this.fetchuser()
  }

  async createUser(){
    let uObj = {
      name: document.getElementById('uid').value,
      pwd: document.getElementById('pwd').value
    };
    console.log(uObj)
  
    let newUser = await fetch('http://localhost:8000/createUser',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(uObj)
    });
    let msg = await newUser.text();
    alert(msg);
  }

  
  render(){
    return (
      <>
      
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to='/all_adm'>Location List</Link></Navbar.Brand>
          <Navbar.Brand><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to='/user_adm'>User List</Link></Navbar.Brand>
          
          <Nav className="me-auto">
          <Nav.Link>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </Nav.Link>
          <Nav.Link><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to='/'>{this.props.islogin ? (getloginfo()['uid'] + "\tLog out") : "Log in"}</Link></Nav.Link>
            
          </Nav>
        </Container>
        </Navbar>
        <div className="container">
          <Table bordered striped hover id="locationlist">
            <thead>
              <tr>
                <th>UserId </th>
                <th>Password </th>
                <th> </th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
            {this.state.user.map((user, index) => <Getuser data={user} i={index} key={index} />)}
            <tr id='newUser'>
              <td><input type="text" id="uid" placeholder='New User ID'/></td>
              <td><input type="text" id="pwd" placeholder='New Password'/></td>
              <td><button type='button'className="btn btn-outline-success me-2" onClick={this.createUser}>Create</button></td>
            </tr>
            </tbody>
          </Table>
        </div>
        {/* <Container>
        <button className="btn btn-outline-success me-2">Add new</button>
        </Container> */}
      </>
    );
  }
}

export { All_adm, User_adm };

