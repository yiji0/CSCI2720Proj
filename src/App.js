import * as React from 'react';
import { useState, useEffect } from 'react';
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
import { Navigate, Outlet } from 'react-router-dom';
import { Search, SearchName, SearchLon, SearchLat } from './Search';
import { All_adm, User_adm } from './adm';
import { logout } from './Login';

function PrivateRoute() {
  const auth = getloginfo();
  return auth ? <Outlet /> : <Navigate to='/login' />;
}

function LoginRoute({ ifLogout, onChangeLogin}) {
  useEffect(() => {
    if (ifLogout)  { console.log("Log out"); logout(); onChangeLogin(); }
  });
  const auth = getloginfo();
  return !auth ? <Outlet /> : <Navigate to='/' />;
}

function App() {
  const [islogin, setLogin] = useState(getloginfo() ? getloginfo()['uid'] : false);
  const [mode, setMode] = useState(getloginfo() ? getloginfo()['mode'] : false)
  const switchloginstate = () => {
    let loginfo = getloginfo();
    console.log("login State: " + (loginfo ? loginfo['uid'] : "not login"));
    if (getloginfo()) { setLogin(loginfo['uid']); setMode(loginfo['mode']) }
    else { setLogin(false); setMode(false) }
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
            <Nav className='me-auto'>
              {mode === 'admin' && <Navbar.Brand><Link style={{ color: 'inherit', textDecoration: 'inherit' }} to='/all_adm'>Location List</Link></Navbar.Brand>}
              {mode === 'admin' && <Navbar.Brand><Link style={{ color: 'inherit', textDecoration: 'inherit' }} to='/user_adm'>User List</Link></Navbar.Brand>}
              {mode === 'user' && <Navbar.Brand><Link style={{ color: 'inherit', textDecoration: 'inherit' }} to='/all'>Home</Link></Navbar.Brand>}
              {mode === 'user' && <Nav.Link><Link style={{ color: 'inherit', textDecoration: 'inherit' }} to='/map'>Map</Link></Nav.Link>}
              {mode === 'user' && <NavDropdown title="Locations" id="basic-nav-dropdown">
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
              </NavDropdown>}
              {mode === 'user' && <Nav.Link><Link style={{ color: 'inherit', textDecoration: 'inherit' }} to='/search'>Search</Link></Nav.Link>}
              {mode === 'user' && <Nav.Link><Link style={{ color: 'inherit', textDecoration: 'inherit' }} to='/favourite'>Favourite Locations</Link></Nav.Link>}
            </Nav>
            <Nav className="justify-content-end">
              {islogin && <Navbar.Text>{mode === 'admin' ? "Admin" : "Sign in as: "}</Navbar.Text>}
              <Nav.Link><Link style={{ color: 'inherit', textDecoration: 'inherit' }} to='/login'>{islogin ? (islogin + '\tLogout') : "Login"}</Link></Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Routes>
          <Route path='/' element={<PrivateRoute />}>
            <Route path='/' element={<All />} />
          </Route>
          <Route path='/login' element={<LoginRoute ifLogout={islogin} onChangeLogin={switchloginstate}/>}>
            <Route path='/login' element={<Login onChangeLogin={switchloginstate} />} />
          </Route>
          <Route path='/all' element={<PrivateRoute />}>
            <Route path='/all' element={<All />} />
          </Route>
          <Route path='/map' element={<PrivateRoute />}>
            <Route path='/map' element={<Map />} />
          </Route>
          <Route path='/favourite' element={<PrivateRoute />}>
            <Route path='/favourite' element={<Fav />} />
          </Route>
          <Route path='/search' element={<PrivateRoute />}>
            <Route path='/search' element={<Search />} />
          </Route>
          <Route path='/:loc' element={<PrivateRoute />}>
            <Route path="/:loc" element={<Detail uid={islogin} />} />
          </Route>
          <Route path='/search/ByName' element={<PrivateRoute />}>
            <Route path='/search/ByName' element={<SearchName islogin={islogin} ></SearchName>} />
          </Route>
          <Route path='/search/ByLon' element={<PrivateRoute />}>
            <Route path='/search/ByLon' element={<SearchLon islogin={islogin} ></SearchLon>} />
          </Route>
          <Route path='/search/ByLat' element={<PrivateRoute />}>
            <Route path="/search/ByLat" element={<SearchLat islogin={islogin} ></SearchLat>} />
          </Route>
          <Route path='/all_adm' element={<PrivateRoute />}>
            <Route path='/all_adm' element={<All_adm islogin={islogin}></All_adm>} />
          </Route>
          <Route path='/user_adm' element={<PrivateRoute />}>
            <Route path='/user_adm' element={<User_adm islogin={islogin}></User_adm>} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
