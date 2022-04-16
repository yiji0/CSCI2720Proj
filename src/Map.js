import * as React from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import locData from './data/loc_info.json';
import {Link} from 'react-router-dom';

const MAPBOX_TOKEN = 'pk.eyJ1Ijoic3V2aWFicyIsImEiOiJjbDFydWlkamkyMHk1M2xtbW1sb2p0a3hpIn0.8V0sfF1FRYSn4B0n-m1vAg';


class Map extends React.Component{
  render(){
    return(
      <ReactMapGL
      initialViewState={{
        longitude: 114.210932,
        latitude: 22.416263,
        zoom: 14
      }}
      style={{width: 1000, height: 600}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken={MAPBOX_TOKEN}
    >
      {locData.map((loc)=>
        <Marker longitude={loc.lon} latitude={loc.lat} anchor="bottom">
          <Link to={'/'+loc.name}>Marker</Link>
        </Marker>
      )}
    </ReactMapGL>
    )
  }
}


class Location extends React.Component{
  render(){
    return(
      <div>The dedailed view</div>
    )
  }
}

export {Map,Location};
