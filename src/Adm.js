import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import { Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import Container from 'react-bootstrap/Container';
import { BACK_END } from './App'


class AllAdm extends React.Component {

  constructor(){
    super();
    this.state = {
      location: []
    };
    this.createLoc = this.createLoc.bind(this);
    this.fetchLoc = this.fetchLoc.bind(this)
  }


  async fetchLoc() {
    let res = await fetch(BACK_END + 'loc1', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    let l = await res.json();
    await this.setState({ location: l });
  }

  componentDidMount() {
    this.fetchLoc()
  }


  refreshData(){
    fetch(BACK_END + 'weather',{
      method:'PUT',
    }).then(res=>res.text()).then(msg=>alert(msg));
  }

  async createLoc(){
    let name = document.querySelector('#newLocName').value;
    let lon = document.getElementById('newlon').value;
    let lat = document.getElementById('newlat').value;
    let newLocObj = {
      name: name,
      lon: lon,
      lat: lat
    };

    // console.log(newLocObj)
    
    let createNewLoc = await fetch(BACK_END + 'loc',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newLocObj)
    });
    let msg = await createNewLoc.text();
    alert(msg)
    
    if(msg=='success'){
      let newLoc = {
        name: name,
        lon: lon.replace('.', '°') + 'E',
        lat: lat.replace('.', '°') + 'N'
      };
      this.setState(previousState => ({
        location: [...previousState.location, newLoc]
      }));
      document.querySelector('#newLocName').value='';
      document.querySelector('#newlon').value='';
      document.querySelector('#newlat').value='';
    }
  }

  async updateLoc(){
    let newLocObj = {
      originalName: document.querySelector("#oname").value,
      name: document.querySelector('#uname').value,
      lon: document.getElementById('ulon').value,
      lat: document.getElementById('ulat').value
    };

    let res = await fetch(BACK_END + 'loc/'+document.querySelector("#oname").value,{
      method:'PUT',
      body:JSON.stringify(newLocObj),
      headers: { 
        'Content-Type': 'application/json'
      }
    });
  }

  render() {
    return (
      <>
        <div className="container">
          <Table bordered striped hover id="locationlist">
            <thead>
              <tr>
                <th>CityName </th>
                <th>Longitude </th>
                <th>Latitude </th>
                <th>Action</th>
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
            <tr id='updateLoc'>
              <td><input type="text" id="oname" placeholder='The original city name'/></td>
              <td><input type="text" id="uname" placeholder='New city name'/></td>
              <td><input type="text" id="ulon" placeholder='New city longitude'/></td>
              <td><input type="text" id="ulat" placeholder='New city latitude'/></td>
              <td><button type='button'className="btn btn-outline-success me-2" onClick={this.updateLoc}>Update</button></td>
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
  deleteLoc(d){
    alert("delete successfully! Please fresh the page.");
    return fetch(BACK_END + 'loc/'+d,{
      method:'DELETE',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }
  render() {
    // let i = this.props.i;
    let data = this.props.data;
    return (
      <tr>
        <td>{data.name}</td>
        <td>{data.lon}</td>
        <td>{data.lat}</td>
        <td><button className="btn btn-outline-success me-2" onClick={() => this.deleteLoc(data.name)}>delete</button></td>
        
      </tr>
    )
  }
}

class Getuser extends React.Component {
  deleteU(d){
    alert("delete successfully! Please fresh the page.");
    return fetch(BACK_END + 'user/'+d,{
      method:'DELETE',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }
  render() {
    // let i = this.props.i;
    let data = this.props.data;
    return (
      <tr>
        <td>{data.id}</td>
        <td>{data.pwd}</td>
        <td><button className="btn btn-outline-success me-2" onClick={() => this.deleteU(data.id)}>delete</button></td>
        
      </tr>
    )
  }
}


class UserAdm extends React.Component {
  constructor(){
    super()
    this.state = {
      user: []
    }
    this.createUser = this.createUser.bind(this);
  }
  

  async fetchuser(){
    let res = await fetch(BACK_END + 'user',{
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
    let name = document.getElementById('uid').value;
    let pwd = document.getElementById('pwd').value;
    let uObj = {
      name:name,
      pwd: pwd
    };
    console.log(uObj)
  
    let newUser = await fetch(BACK_END + 'createUser',{
      method:'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(uObj)
    });
    let user = await newUser.json();
    
    this.setState(previousState => ({
      user: [...previousState.user, user]
    }));
    document.querySelector('#uid').value='';
    document.querySelector('#pwd').value='';
    
  }
  
  async updateUser(){
    let newObj = {
      id: document.querySelector("#oid").value,
      newid: document.querySelector('#unewuid').value,
      newpwd: document.getElementById('upwd').value
    };

    fetch(BACK_END + 'user',{
      method:'PUT',
      body:JSON.stringify(newObj),
      headers: { 
        'Content-Type': 'application/json'
      }
    })
    .then(
      res => res.status == 200 ? window.alert("Updated successfully :)\nPlease refresh the page.") : window.alert("Failed to update :(")
    );
  }
  
  render(){
    return (
      <>
        <div className="container">
          <Table bordered striped hover id="locationlist">
            <thead>
              <tr>
                <th>UserId </th>
                <th>Password </th>
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
            <tr id='updateUser'>
              <td><input type="text" id="oid" placeholder='The original User ID'/></td>
              <td><input type="text" id="unewuid" placeholder='New User ID'/></td>
              <td><input type="text" id="upwd" placeholder='New password'/></td>
              <td><button type='button'className="btn btn-outline-success me-2" onClick={this.updateUser}>Update</button></td>
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

export { AllAdm, UserAdm };

