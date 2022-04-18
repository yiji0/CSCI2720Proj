import * as React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import Map from './Map';
import {All, Fav} from './All';
import Search from './Search';
import Detail from './Detail';
import Login from './Login'


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
        <div>
        <ul>
        <Link to='/login'>Login</Link>
        <Link to="/map">Map</Link>
        <Link to='/'>All</Link>
        <Link to='/search'>Search</Link>
        <Link to='/favourite'>Favourite Locations</Link>
        </ul>

        <hr/>

        <Routes>
        <Route path='/login' element={<Login/>} />
        <Route path="/map" element={<Map/>} />
        <Route path='/' element={<All/>} />
        <Route path='/favourite' element={<Fav/>} />
        <Route path='/search' element={<Search cities={CITIES}/>} />
        <Route path="/:loc" element={<Detail/>} />
        </Routes>
        </div>
        </BrowserRouter>
        </>     
    );
}

export default App;
