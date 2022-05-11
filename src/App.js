import * as React from 'react';
import { useState } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import Map from './Map';
import { All, Fav } from './All';
import Detail from './Detail';
import { getloginfo, Login } from './Login';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import { Search, SearchName, SearchLon, SearchLat } from './Search';

const CITIES = [
  [
    { "name": "Lhasa", "lat": "29.65", "lon": "91.1" },
    { "name": "Urumchi", "lat": "43.8", "lon": "87.58" },
    { "name": "Sanya", "lat": "19.26", "lon": "109.67" },
    { "name": "Kunming", "lat": "25.04", "lon": "102.72" },
    { "name": "Changsha", "lat": "28.18", "lon": "113.11" },
    { "name": "Hong Kong", "lat": "22.28", "lon": "114.15" },
    { "name": "Tokyo", "lat": "35.69", "lon": "139.69" },
    { "name": "Seoul", "lat": "37.57", "lon": "127" },
    { "name": "Shanghai", "lat": "31.01", "lon": "121.41" },
    { "name": "Hohhot", "lat": "40.81", "lon": "111.65" },
    { "name": "Harbin", "lat": "45.75", "lon": "126.65" },
    { "name": "Singapore City", "lat": "1.29", "lon": "103.86" },
    { "name": "Chengdu", "lat": "30.67", "lon": "104.07" },
    { "name": "Beijing", "lat": "39.93", "lon": "116.39" },
    { "name": "Taipei", "lat": "25.04", "lon": "121.53"}
  ]
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
    document.cookie.split(';').forEach(function (el) {
      let [key, value] = el.split('=');
      cookie[key.trim()] = value;
    })
    return cookie[cookieName];
  }

  return (
    <>
      <BrowserRouter>
        <Navbar bg="dark" variant="dark">
          <Container>
            <Navbar.Brand><Link style={{ color: 'inherit', textDecoration: 'inherit' }} to='/all'>Home</Link></Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link><Link style={{ color: 'inherit', textDecoration: 'inherit' }} to='/map'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Map&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Link></Nav.Link>
              <NavDropdown title="Locations" id="basic-nav-dropdown">
                <NavDropdown.Item><Link style={{ color: 'inherit', textDecoration: 'inherit' }} to='/all'>All Locations</Link></NavDropdown.Item>
                <NavDropdown.Item><Link style={{ color: 'inherit', textDecoration: 'inherit' }} to='/Hong Kong'>Hong Kong</Link></NavDropdown.Item>
                <NavDropdown.Item><Link style={{ color: 'inherit', textDecoration: 'inherit' }} to='/Beijing'>Beijing</Link></NavDropdown.Item>
                <NavDropdown.Item><Link style={{ color: 'inherit', textDecoration: 'inherit' }} to='/Shanghai'>Shanghai</Link></NavDropdown.Item>
                <NavDropdown.Item><Link style={{ color: 'inherit', textDecoration: 'inherit' }} to='/Harbin'>Harbin</Link></NavDropdown.Item>
                <NavDropdown.Item><Link style={{ color: 'inherit', textDecoration: 'inherit' }} to='/Lahsa'>Lahsa</Link></NavDropdown.Item>
                <NavDropdown.Item><Link style={{ color: 'inherit', textDecoration: 'inherit' }} to='/Urumchi'>Urumchi</Link></NavDropdown.Item>
                <NavDropdown.Item><Link style={{ color: 'inherit', textDecoration: 'inherit' }} to='/Seoul'>Seoul</Link></NavDropdown.Item>
                <NavDropdown.Item><Link style={{ color: 'inherit', textDecoration: 'inherit' }} to='/Tokyo'>Tokyo</Link></NavDropdown.Item>
                <NavDropdown.Item><Link style={{ color: 'inherit', textDecoration: 'inherit' }} to='/Hohhot'>Hohhot</Link></NavDropdown.Item>
                <NavDropdown.Item><Link style={{ color: 'inherit', textDecoration: 'inherit' }} to='/Singapore City'>Singapore City</Link></NavDropdown.Item>
                <NavDropdown.Item><Link style={{ color: 'inherit', textDecoration: 'inherit' }} to='/Chengdu'>Chengdu</Link></NavDropdown.Item>
                <NavDropdown.Item><Link style={{ color: 'inherit', textDecoration: 'inherit' }} to='/Kunming'>Kunming</Link></NavDropdown.Item>
                <NavDropdown.Item><Link style={{ color: 'inherit', textDecoration: 'inherit' }} to='/Sanya'>Sanya</Link></NavDropdown.Item>
                <NavDropdown.Item><Link style={{ color: 'inherit', textDecoration: 'inherit' }} to='/Taipei'>Taipei</Link></NavDropdown.Item>
              </NavDropdown>
              <Nav.Link><Link style={{ color: 'inherit', textDecoration: 'inherit' }} to='/search'>&nbsp;&nbsp;&nbsp;&nbsp;Search</Link></Nav.Link>
              <Nav.Link><Link style={{ color: 'inherit', textDecoration: 'inherit' }} to='/favourite'>&nbsp;&nbsp;&nbsp;&nbsp;Favourite Locations</Link></Nav.Link>
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
              <Nav.Link><Link style={{ color: 'inherit', textDecoration: 'inherit' }} to='/'>{islogin ? (getloginfo()['uid'] + "\tLog out") : "Log in"}</Link></Nav.Link>

            </Nav>
          </Container>
        </Navbar>
        <br />
        <div>

          <Routes>
            <Route path='/' element={<Login onChangeLogin={switchloginstate} />} />
            <Route path="/map" element={<Map />} />
            <Route path='/all' element={<All />} />
            <Route path='/favourite' element={<Fav />} />
            <Route path='/search' element={<Search cities={CITIES} />} />
            <Route path="/:loc" element={<Detail uid={islogin} />} />
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
