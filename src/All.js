import * as React from 'react';
import { useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Map from './Map';
import {All, Fav} from './All';
import Detail from './Detail';
import {getloginfo, Login} from './Login';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import {Search, SearchName, SearchLon, SearchLat} from './Search';

let CITIES = [
  {name: 'HongKong', lat: '114°10E', lon: '22°16N'},
  {name: 'Beijing', lat: '116°40E', lon: '39°90N'},
  {name: 'Shanghai', lat: 'TBD', lon: 'TBD'},
  {name: 'Harbin', lat: 'TBD', lon: 'TBD'},
  {name: 'Lahsa', lat: 'TBD', lon: 'TBD'},
  {name: 'Urumchi', lat: 'TBD', lon: 'TBD'},
  {name: 'Hohhot', lat: 'TBD', lon: 'TBD'},
  {name: 'Chengdu', lat: 'TBD', lon: 'TBD'},
  {name: 'Changsha', lat: 'TBD', lon: 'TBD'},
  {name: 'Kunming', lat: 'TBD', lon: 'TBD'},
  {name: 'Sanya', lat: 'TBD', lon: 'TBD'},
  {name: 'Taipei', lat: 'TBD', lon: 'TBD'},
  {name: 'Tokyo', lat: 'TBD', lon: 'TBD'},
  {name: 'Seoul', lat: 'TBD', lon: 'TBD'},
  {name: 'Singapore', lat: 'TBD', lon: 'TBD'}
];

function App() {
  const [islogin, setLogin] = useState(getloginfo() ? getloginfo()['uid'] : false);
  const switchloginstate = () => {
    let loginfo = getloginfo();
    console.log("Switch state: " + (loginfo ? loginfo['uid'] : "no state"));
    if (getloginfo()) setLogin(loginfo['uid']);
    else setLogin(false);
  };

  function getCookie(cookieName) {
    let cookie = {};
    document.cookie.split(';').forEach(function(el) {
      let [key,value] = el.split('=');
      cookie[key.trim()] = value;
    })
    return cookie[cookieName];
  }  
  
  return (
        <>
        <BrowserRouter>
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
            <Nav.Link><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to='/'>{islogin ? (getloginfo()['uid'] + "\tLog out") : "Log in"}</Link></Nav.Link>
            
          </Nav>
        </Container>
        </Navbar>
        <br/>
        <div>

        <Routes>
        <Route path='/' element={<Login onChangeLogin={switchloginstate}/>} />
        <Route path="/map" element={<Map/>} />
        <Route path='/all' element={<All/>} />
        <Route path='/favourite' element={<Fav />} />
        <Route path='/search' element={<Search cities={CITIES}/>} />
        <Route path="/:loc" element={<Detail uid={islogin}/>} />
        <Route path='/search/ByName' element={<SearchName cities={CITIES}></SearchName>} />
        <Route path='/search/ByLon' element={<SearchLon cities={CITIES}></SearchLon>} />
        <Route path="/search/ByLat" element={<SearchLat cities={CITIES}></SearchLat>} />
        </Routes>
        </div>
        </BrowserRouter>
        </>
    );
}

export default App;
