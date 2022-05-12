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
    location: [],
    user: []
  }

  async fetchLoc() {
    let res = await fetch('http://localhost:8000/loc1', {
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

  async fetchuser() {
    let res = await fetch('http://localhost:8000/user', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    let l = await res.json();
    await this.setState({ user: l });
  }

  componentDidMount() {
    this.fetchuser()
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
                <th>Deletion</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {this.state.location.map((loc, index) => <GetFav data={loc} i={index} key={index} />)}
            </tbody>
          </Table>
        </div>
        <button className="btn btn-outline-success me-2">Add new</button>
      </>
    );
  }
}

class GetFav extends React.Component {
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
        <td><button className="btn btn-outline-success me-2">delete</button></td>
        <td><button className="btn btn-outline-success me-2">update</button></td>
      </tr>
    )
  }
}

class User_adm extends React.Component {
  render() {
    return (
      <>
        <div className="container">
          <Table bordered striped hover id="locationlist">
            <thead>
              <tr>
                <th>UserId </th>
                <th>Deletion</th>
                <th>Update</th>
              </tr>
            </thead>
            <tbody>
              {this.state.user.map((user, index) => <Getuser data={user} i={index} key={index} />)}
            </tbody>
          </Table>
        </div>
        <button className="btn btn-outline-success me-2">Add new</button>
      </>
    );
  }
}

export { All_adm, User_adm };

