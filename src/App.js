import * as React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Map from './Map';
import {All, Fav} from './All';
import Detail from './Detail';
import {getloginfo, logout, Login} from './Login';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';
import {Search, SearchName, SearchLon, SearchLat} from './Search';

const CITIES = [
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
  return (
        <> 
        <BrowserRouter>
        <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to='/all'>Home</Link></Navbar.Brand>
          <Nav className="me-auto">
          <Nav.Link><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to='/map'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Map&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Link></Nav.Link>
            <NavDropdown title="Locations" id="basic-nav-dropdown">
              <NavDropdown.Item><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to='/all'>All Locations</Link></NavDropdown.Item>
              <NavDropdown.Item><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to='/HongKong'>Hong Kong</Link></NavDropdown.Item>
              <NavDropdown.Item><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to='/Beijing'>Beijing</Link></NavDropdown.Item>
              <NavDropdown.Item><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to='/Shanghai'>Shanghai</Link></NavDropdown.Item>
              <NavDropdown.Item><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to='/Harbin'>Harbin</Link></NavDropdown.Item>
              <NavDropdown.Item><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to='/Lahsa'>Lahsa</Link></NavDropdown.Item>
              <NavDropdown.Item><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to='/Urumchi'>Urumchi</Link></NavDropdown.Item>
              <NavDropdown.Item><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to='/Seoul'>Seoul</Link></NavDropdown.Item>
              <NavDropdown.Item><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to='/Tokyo'>Tokyo</Link></NavDropdown.Item>
              <NavDropdown.Item><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to='/Hohhot'>Hohhot</Link></NavDropdown.Item>
              <NavDropdown.Item><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to='/Singapore'>Singapore City</Link></NavDropdown.Item>
              <NavDropdown.Item><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to='/Chengdu'>Chengdu</Link></NavDropdown.Item>
              <NavDropdown.Item><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to='/Kunming'>Kunming</Link></NavDropdown.Item>
              <NavDropdown.Item><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to='/Sanya'>Sanya</Link></NavDropdown.Item>
              <NavDropdown.Item><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to='/Taipei'>Taipei</Link></NavDropdown.Item>
            </NavDropdown>
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
            <Nav.Link><Link style={{ color: 'inherit', textDecoration: 'inherit'}} to='/'>{getloginfo() ? "Log out" : "Log in"}</Link></Nav.Link>
            
          </Nav>
        </Container>
        </Navbar>
        <br/>
        <div>

        <Routes>
        <Route path='/' element={<Login/>} />
        <Route path="/map" element={<Map/>} />
        <Route path='/all' element={<All/>} />
        <Route path='/favourite' element={<Fav/>} />
        <Route path='/search' element={<Search cities={CITIES}/>} />
        <Route path="/:loc" element={<Detail/>} />
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
