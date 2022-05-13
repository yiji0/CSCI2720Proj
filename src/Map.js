import * as React from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import { Link } from 'react-router-dom';
import {BACK_END} from './App'

const MAPBOX_TOKEN = 'pk.eyJ1Ijoic3V2aWFicyIsImEiOiJjbDFydWlkamkyMHk1M2xtbW1sb2p0a3hpIn0.8V0sfF1FRYSn4B0n-m1vAg';


class Map extends React.Component {
  constructor() {
    super()
    this.state = {
      locData: []
    };
  }

  async fetchLoc() {
    let res = await fetch(BACK_END+'loc', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
    let loc = await res.json();
    await this.setState({ locData: loc })
  }

  componentDidMount() {
    this.fetchLoc()
  }

  render() {
    console.log(this.state.locData);

    return (
      <>
        <ReactMapGL
          initialViewState={{
            longitude: 114.210932,
            latitude: 22.416263,
            zoom: 2
          }}
          style={{ width: '80vw', height: '100vh' }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          mapboxAccessToken={MAPBOX_TOKEN}
        >
          {this.state.locData.map((loc) =>
            <Marker longitude={loc.lon} latitude={loc.lat} anchor="bottom">
              <Link to={'/' + loc.name}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" class="bi bi-geo-alt" viewBox="0 0 16 16">
                  <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                  <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                </svg>
              </Link>
            </Marker>
          )}
        </ReactMapGL>
      </>
    )
  }
}


export default Map;
