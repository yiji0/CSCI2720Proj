import 'bootstrap/dist/css/bootstrap.css';
import * as React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Table from 'react-bootstrap/Table'
import { getloginfo } from './Login'
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';

class All extends React.Component {
  sortname() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("locationlist");
    switching = true;
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[0];
        y = rows[i + 1].getElementsByTagName("TD")[0];
        if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }
  sortlat() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("locationlist");
    switching = true;
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[2];
        y = rows[i + 1].getElementsByTagName("TD")[2];
        let p = x.innerHTML;
        let t = y.innerHTML;
        let pp = p.indexOf("°");
        let tt = t.indexOf("°");
        let xx = Number(p.substring(0,pp));
        let yy = Number(t.substring(0,tt));
        
        if (xx > yy) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }
  sortlon() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("locationlist");
    switching = true;
    while (switching) {
      switching = false;
      rows = table.rows;
      for (i = 1; i < (rows.length - 1); i++) {
        shouldSwitch = false;
        x = rows[i].getElementsByTagName("TD")[1];
        y = rows[i + 1].getElementsByTagName("TD")[1];
        let p = x.innerHTML;
        let t = y.innerHTML;
        let pp = p.indexOf("°");
        let tt = t.indexOf("°");
        if(pp==-1){
          pp=p.length-1;
        }
        if(tt==-1){
          tt=t.length-1;
        }
        let xx = Number(p.substring(0,pp));
        let yy = Number(t.substring(0,tt));
        if (xx > yy) {
          shouldSwitch = true;
          break;
        }
      }
      if (shouldSwitch) {
        rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
        switching = true;
      }
    }
  }
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


  render() {
    return (
      <>
      
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to='/all'>Home</Link></Navbar.Brand>
          <Nav className="me-auto">
          <Nav.Link><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to='/map'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Map&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Link></Nav.Link>
            <Nav.Link><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to='/search'>&nbsp;&nbsp;&nbsp;&nbsp;Search</Link></Nav.Link>
            <Nav.Link><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to='/favourite'>&nbsp;&nbsp;&nbsp;&nbsp;Favourite Locations</Link></Nav.Link>
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
                <th>CityName <button className="btn btn-outline-success me-2" onClick={this.sortname}>Sort</button></th>
                <th>Longitude <button className="btn btn-outline-success me-2" onClick={this.sortlon}>Sort</button></th>
                <th>Latitude <button className="btn btn-outline-success me-2" onClick={this.sortlat}>Sort</button></th>
              </tr>
            </thead>
            <tbody>
            {this.state.location.map((loc, index) => <Get data={loc} i={index} key={index} />)}
            </tbody>
          </Table>
        </div>
      </>
    );
  }
}

class Get extends React.Component {
  render() {
    let i = this.props.i;
    let data = this.props.data;
    return (
      <tr>
        <td><Link to={'/' + data.name}>{data.name}</Link></td>
        <td>{data.lon}</td>
        <td>{data.lat}</td>
      </tr>
    )
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
      </tr>
    )
  }
}

class Fav extends React.Component {
  state = {
    location: []
  }

  async componentDidMount() {
    const loginfo = getloginfo();
    if (loginfo && loginfo['mode'] === 'user') {
      const url = "http://localhost:8000/favlist/" + loginfo['uid'];
      fetch(url, { method: "POST" }).then(res => res.text())
        .then(data => {
          if (data) {
            this.setState({ location: JSON.parse(data) });
          }
        })
        .catch(err => {
          console.log(err.message);
        });
    } else {
      alert("Please login in first!");
      this.setState({ location: [] });
    }
  }
  render() {
    return (
      <>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to='/all'>Home</Link></Navbar.Brand>
          <Nav className="me-auto">
          <Nav.Link><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to='/map'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Map&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Link></Nav.Link>
            <Nav.Link><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to='/search'>&nbsp;&nbsp;&nbsp;&nbsp;Search</Link></Nav.Link>
            <Nav.Link><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to='/favourite'>&nbsp;&nbsp;&nbsp;&nbsp;Favourite Locations</Link></Nav.Link>
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
        <Table bordered striped hover>
          <thead>
            <tr>
              <th>CityName</th>
              <th>Longitude</th>
              <th>Latitude</th>
              <th>        </th>
            </tr>
          </thead>
          <tbody>
            {this.state.location.map((loc, index) => <GetFav data={loc} i={index} key={index} />)}
          </tbody>
        </Table>
      </div>
      </>
    )
  }
}

export { All, Fav };

