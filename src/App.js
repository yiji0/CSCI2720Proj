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

import {Search, SearchName, SearchLon, SearchLat} from './Search';
import {All_adm, User_adm} from './adm';

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
        
        <br/>
        <div>

        <Routes>
        <Route path='/' element={<Login onChangeLogin={switchloginstate}/>} />
        <Route path="/map" element={<Map islogin={islogin}/>} />
        <Route path='/all' element={<All islogin={islogin}></All>} />
        <Route path='/favourite' element={<Fav />} />
        <Route path='/search' element={<Search islogin={islogin} cities={CITIES}/>} />
        <Route path="/:loc" element={<Detail uid={islogin}/>} />
        <Route path='/search/ByName' element={<SearchName islogin={islogin} cities={CITIES}></SearchName>} />
        <Route path='/search/ByLon' element={<SearchLon islogin={islogin} cities={CITIES}></SearchLon>} />
        <Route path="/search/ByLat" element={<SearchLat islogin={islogin} cities={CITIES}></SearchLat>} />
        <Route path='/all_adm' element={<All_adm islogin={islogin}></All_adm>} />
        <Route path='/user_adm' element={<User_adm islogin={islogin}></User_adm>} />
        </Routes>
        </div>
      </BrowserRouter>
    </>
  );
}

export default App;
