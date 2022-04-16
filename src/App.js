import * as React from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import {BrowserRouter, Routes, Route, Link} from 'react-router-dom';
import {Map, Location} from './Map';

function App() {
  return (
        <> 
        <BrowserRouter>
        <div>
        <ul>
        <Link to="/map">Map</Link>
        </ul>

        <hr/>

        <Routes>
        <Route path="/map" element={<Map/>} />
        <Route path="/:loc" element={<Location/>} />
        </Routes>
        </div>
        </BrowserRouter>
        </>     
    );
}

export default App;
