import * as React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import {Map, Location} from './Map';
import {All, Fav} from './All';
import Search from './Search';

const CITIES = [
  {temp: '25°C', name: 'Hong Kong'},
  {temp: '25°C', name: 'Beijing'},
  {temp: '25°C', name: 'Shanghai'},
  {temp: '25°C', name: 'Harbin'},
  {temp: '25°C', name: 'Lahsa'},
  {temp: '25°C', name: 'Urumchi'},
  {temp: '25°C', name: 'Hohhot'},
  {temp: '25°C', name: 'Chengdu'},
  {temp: '25°C', name: 'Changsha'},
  {temp: '25°C', name: 'Kunming'},
  {temp: '25°C', name: 'Sanya'},
  {temp: '25°C', name: 'Taipei'},
  {temp: '25°C', name: 'Tokyo'},
  {temp: '25°C', name: 'Seoul'},
  {temp: '25°C', name: 'Singapore City'}
];

function App() {
  return (
        <> 
        <BrowserRouter>
        <div>
        <ul>
        <Link to="/map">Map</Link>
        <Link to='/'>All</Link>
        <Link to='/search'>Search</Link>
        <Link to='/favourite'>Favourite Locations</Link>
        </ul>

        <hr/>

        <Routes>
        <Route path="/map" element={<Map/>} />
        <Route path='/' element={<All/>} />
        <Route path='/favourite' element={<Fav/>} />
        <Route path='/search' element={<Search cities={CITIES}/>} />
        <Route path="/:loc" element={<Location/>} />
        </Routes>
        </div>
        </BrowserRouter>
        </>     
    );
}

export default App;
