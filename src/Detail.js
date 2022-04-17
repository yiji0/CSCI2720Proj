import React from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


const MAPBOX_TOKEN = 'pk.eyJ1Ijoic3V2aWFicyIsImEiOiJjbDFydWlkamkyMHk1M2xtbW1sb2p0a3hpIn0.8V0sfF1FRYSn4B0n-m1vAg';


class Detail extends React.Component{
    constructor(props){
        super();
        this.state={
            comment:null,
            temp_c:0,
            wind_kph:0,
            wind_dir:null,
            humidity:0,
            precip_mm:0,
            vis_km:0,
            location:{
                name:null,
                lon:0,
                lat:0
            }
        }
    }
    
    async componentDidMount(){
        const url = window.location.href;
        const response = await fetch(url);
        const data = await response.json();
        this.setState({
            comment:data.comments, 
            temp_c:data.temp_c, 
            wind_kph:data.wind_kph, 
            wind_dir:data.wind_dir, 
            humidity:data.humidity,
            precip_mm:data.precip_mm,
            vis_km:data.vis_km
        });
    }

    render(){
        return(
            <div>
                <div>{this.state.comment}</div>
                <div>{this.state.temp_c}</div>
                <div>{this.state.wind_kph}</div>
                <SmallMap info={this.state.location}/>
            </div>
        );
    }
    
}

class SmallMap extends React.Component{
    render(){
        return(
            <ReactMapGL
            initialViewState={{
                longitude: this.props.info.lon,
                latitude: this.props.info.lat,
                zoom: 10
            }}
            style={{width: '50vw', height: '100vh'}}
            mapStyle="mapbox://styles/mapbox/streets-v9"
            mapboxAccessToken={MAPBOX_TOKEN}
            >
            <Marker longitude={this.props.info.lon} latitude={this.props.info.lat} anchor="bottom">
                Marker
            </Marker>
            </ReactMapGL>
        )
    }
}
  export default Detail;