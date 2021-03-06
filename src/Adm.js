/*LI Yuanheng (1155141669), JIANG Hongxu (1155141403), LIU Ziqi (1155141647)。
ZHANG Shenghao (1155141511), JI Yi (1155141508), DUAN Jianing (1155141464)*/ 
import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import Table from 'react-bootstrap/Table';
import { BACK_END } from './App';
import sha256 from 'crypto-js/sha256';



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
    
    if (newLocObj['name'] === '' || newLocObj['lon'] === '' || newLocObj['lat'] === '') {
      window.alert("Invalid input :(\nPlease fill in all blanks.");
    } else {
      let createNewLoc = await fetch(BACK_END + 'loc',{
        method: 'POST',
        headers:{
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newLocObj)
      });
      let msg = await createNewLoc.text();
      
      if(msg==='success'){
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
        window.alert("Create successfully. :)");
      } else {
        window.alert("Invalid input :(\nPlease check whether the city has existed.");
      }
    }
  }

  async updateLoc(){
    let newLocObj = {
      originalName: document.querySelector("#oname").value,
      name: document.querySelector('#uname').value,
      lon: document.getElementById('ulon').value,
      lat: document.getElementById('ulat').value
    };

    if (newLocObj['originalName'] === '' || newLocObj['name'] === '' || newLocObj['lon'] === '' || newLocObj['lat'] === '') {
      window.alert("Invalid input :(\nPlease fill in all blanks.");
    } else {
      await fetch(BACK_END + 'loc/'+document.querySelector("#oname").value,{
        method:'PUT',
        body:JSON.stringify(newLocObj),
        headers: { 
          'Content-Type': 'application/json'
        }
      }).then(
        res => res.status === 200 ? window.alert("Updated successfully :)\nPlease refresh the page.") : window.alert("Failed to update :(")
      );
    }
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
                <th>Action </th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
            {this.state.location.map((loc, index) => <LocInfo data={loc} i={index} key={index} />)}
            </tbody>
          </Table>
          <button className="btn btn-outline-success me-2 my-2" onClick={this.refreshData}>Refresh Weather Data</button>
          
          <h4>Create New Location:</h4>
          <form>
            <div className='form-group'>
              <label for='newLocName'>Name: </label>
              <input type="text" id="newLocName" className='form-control'/>
            </div>
            <div className='form-group'>
              <label for='newlon'>Longitude: </label>
              <input type="text" id="newlon" className='form-control'/>  
            </div>
            <div className='form-group'>
              <label for='newlat'>Latitude: </label>
              <input type="text" id="newlat" className='form-control'/>
            </div>
            <button type='button'className="btn btn-outline-success me-2 my-2" onClick={this.createLoc}>Create</button>  
          </form>

          <h4>Update Existing Location:</h4>
          <form>
            <div className='form-group'>
              <label for='oname'>Original Name: </label>
              <input type="text" id="oname" className='form-control'/>
            </div>
            <div className='form-group'>
              <label for='uname'>New Name:</label>
              <input type="text" id="uname" className='form-control'/> 
            </div>
            <div className='form-group'>
              <label for='ulon'>New Longitude:</label>
              <input type="text" id="ulon" className='form-control'/>
            </div>
            <div className='form-group'>
              <label for='ulat'>New Latitude:</label>
              <input type="text" id="ulat" className='form-control'/>
            </div>
            <button type='button'className="btn btn-outline-success me-2 my-2" onClick={this.updateLoc}>Update</button>  
          </form>
          
        </div>
        
      </>
    );
  }
}


class LocInfo extends React.Component {
  deleteLoc(d){
    alert("Delete successfully! Please fresh the page.");
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
    alert("Delete successfully! Please fresh the page.");
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

    if (name.length<4 || name.length>20 ||pwd.length<4 || pwd.length>20) {
      window.alert("Invalid input :(\nPlease check wether you have input correct username and password.");
      return;
    } else {
      let uObj = {
        name:name,
        pwd: sha256(pwd).toString()
      };
      console.log(uObj)

      let newUser = await fetch(BACK_END + 'createUser',{
        method:'POST',
        headers:{
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(uObj)
      })
      

      let msg = await newUser.text();
      alert(msg);

      let obj = {
        id: uObj['name'],
        pwd: uObj['pwd']
      };
      
      if (msg==='success'){
        this.setState(previousState => ({
          user: [...previousState.user, obj]
        }));
        document.querySelector('#uid').value='';
        document.querySelector('#pwd').value='';
      }
      
    }
  }

  
  async updateUser(){
    let newObj = {
      id: document.querySelector("#oid").value,
      newid: document.querySelector('#unewuid').value,
      newpwd: document.getElementById('upwd').value
    };

    if (newObj['id'] === '') {
      window.alert("Invalid input :(\nPlease enter the original username.");
    } else if (newObj['newid'] === '' && newObj['newpwd'] === '') {
      window.alert("Invalid input :(\nPlease enter at least one of the updating attributes.");
    } else if (newObj['newid'] !== '' && (newObj['newid'].length < 4 || newObj['newid'].length > 20)) {
      window.alert("Invalid input :(\nPlease check the length of username.");
    } else if (newObj['newpwd'] !== '' && (newObj['newpwd'].length < 4 || newObj['newpwd'].length > 20)) {
      window.alert("Invalid input :(\nPlease check the length of password.");
    } else {
      fetch(BACK_END + 'user',{
        method:'PUT',
        body:JSON.stringify(newObj),
        headers: { 
          'Content-Type': 'application/json'
        }
      })
      .then(
        res => res.status === 200 ? window.alert("Updated successfully :)\nPlease refresh the page.") : window.alert("Failed to update :(")
      );
    }
  }
  
  render(){
    return (
      <>
        <div className="container">
          <Table bordered striped hover id="locationlist">
            <thead>
              <tr>
                <th>Username </th>
                <th>Password </th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
            {this.state.user.map((user, index) => <Getuser data={user} i={index} key={index} />)}
            {/* <tr id='newUser'>
              <td><input type="text" id="uid" placeholder='New User ID (4-20 characters)'/></td>
              <td><input type="text" id="pwd" placeholder='New Password (4-20 characters)'/></td>
              <td><button type='button'className="btn btn-outline-success me-2" onClick={this.createUser}>Create</button></td>
            </tr>
            <tr id='updateUser'>
              <td><input type="text" id="oid" placeholder='The original User ID'/></td>
              <td><input type="text" id="unewuid" placeholder='New User ID (4-20 characters)'/></td>
              <td><input type="text" id="upwd" placeholder='New password (4-20 characters)'/></td>
              <td><button type='button'className="btn btn-outline-success me-2" onClick={this.updateUser}>Update</button></td>
            </tr> */}
            </tbody>
          </Table>

          <h4>Create New User:</h4>
          <form>
            <div className='form-group'>
              <label for='uid'>New User Name:</label>
              <input type="text" id="uid" className='form-control' placeholder='New User Name (4-20 characters)'/ >
            </div>
            <div className='form-group'>
              <label for='pwd'>Password:</label>
              <input type="password" id="pwd" className='form-control' placeholder='New password (4-20 characters)'/>
            </div>
            <button type='button'className="btn btn-outline-success me-2 my-2" onClick={this.createUser}>Create</button>
          </form>

          <h4>Update Existing User:</h4>
          <form>
            <div className='form-group'>
              <label for='oid'>Original User Name:</label>
              <input type="text" id="oid" className='form-control'/>
            </div>
            <div className='form-group'>
              <label for='unewuid'>New User Name:</label>
              <input type="text" id="unewuid" className='form-control' placeholder='New User Name (4-20 characters)'/>
            </div>
            <div className='form-group'>
              <label for='upwd'>New Password:</label>
              <input type="password" id="upwd" className='form-control' placeholder='New password (4-20 characters)'/>
            </div>
            <button type='button'className="btn btn-outline-success me-2 my-2" onClick={this.updateUser}>Update</button>
          </form>
        </div>
      </>
    );
  }
}

export { AllAdm, UserAdm };

