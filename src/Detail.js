/*LI Yuanheng (1155141669), JIANG Hongxu (1155141403), LIU Ziqi (1155141647)。
ZHANG Shenghao (1155141511), JI Yi (1155141508), DUAN Jianing (1155141464)*/ 
import React from 'react';
import ReactMapGL, { Marker } from 'react-map-gl';
import {BACK_END} from './App';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = 'pk.eyJ1Ijoic3V2aWFicyIsImEiOiJjbDFydWlkamkyMHk1M2xtbW1sb2p0a3hpIn0.8V0sfF1FRYSn4B0n-m1vAg';


class Detail extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comments: [],
            weather: {
                temp_c: "Loading",
                wind_kph: "Loading",
                wind_dir: 'Loading',
                humidity: 'Loading',
                precip_mm: 'Loading',
                vis_km: 'Loading',
                last_updated: null
            },
            location: {
                name: window.location.pathname.split('/')[1],
                lon: 0,
                lat: 0,
            },
            inFav: 0 // by default not in Favlist
        };
        this.addFav = this.addFav.bind(this);
        this.addComment = this.addComment.bind(this);
    }

    // const [comments, setComments] = useState([
    //     {user:'unername', comment:'this is very nice'},
    //     {user:'unsername2', comment:'this is also very nice'}        
    // ]); 

    // const [weather, setWeather] = useState({
    //     temp_c:"TBD",
    //     wind_kph:"TBD",
    //     wind_dir:null,
    //     humidity:0,
    //     precip_mm:0,
    //     vis_km:0});

    // const [location, setLocation] = useState({
    //     name: window.location.pathname.split('/')[1],
    //     lon:0,
    //     lat:0
    // })

    // let data = {
    //     comments:[
    //         {user:'unername', comment:'this is very nice'},
    //         {user:'unsername2', comment:'this is also very nice'}        
    //     ],
    //     temp_c:"TBD",
    //     wind_kph:"TBD",
    //     wind_dir:null,
    //     humidity:0,
    //     precip_mm:0,
    //     vis_km:0,
    //     location:{
    //         name:null,
    //         lon:0,
    //         lat:0
    //     }
    // };

    async fetchInfo() {
        // ftech location infomation for map
        let locres = await fetch(BACK_END + 'loc/' + this.state.location.name, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        let loc = await locres.json();
        this.setState((prevState) => ({ location: loc }));

        // refresh weather info

        let newres = await fetch(BACK_END+'weather',{
            method: 'PUT'
        })
        let msg = await newres.text();
        console.log(msg);

        // fetch weather infomation
        let wres = await fetch(BACK_END + 'weather/' + this.state.location.name, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        let weatherInfo = await wres.json();
        this.setState((prevState) => ({ weather: weatherInfo }));

        // fetch favlist and check whether exists
        let favres = await fetch(BACK_END + 'favlist/' + this.props.uid, {
            method: 'POST',
        });
        let fav = await favres.json();
        let favlist = fav.map((loc)=>loc.name)
        // console.log(favlist)
        this.setState({inFav:favlist.some(loc=>loc===this.state.location.name)? 1:0})

        // fetch comments
        let commres = await fetch(BACK_END + 'comment/'+this.state.location.name,{
            method:'GET',
          });
        let comments = await commres.json();
        console.log(comments[0]);
        this.setState({ comments: comments });
    }
    
    componentWillMount(){
        this.fetchInfo();
    }

    async addComment() {
        let newCom = {
            uid: this.props.uid, 
            location: this.state.location.name,
            comment: document.getElementById('new-comment').value
        };
        console.log(newCom);
        fetch(BACK_END + 'comment', {
            method: 'PUT',
            body: JSON.stringify(newCom),
            headers: {
                'Content-Type': 'application/json'
            },
        }).then(res => {
            if (res.status === 201) {
                return res.text();
            } else {
                throw new Error("Fail to add comment");
            }
        }).then(res => {
            let comments = this.state.comments;
            comments.push({ user: newCom.uid, comment: newCom.comment });
            this.setState({ comments: comments })
            document.getElementById('new-comment').value = '';
            // let newComment = document.createElement("div");
            // let element = '<div></div><div><p></p></div>'
            // newComment.innerHTML = element;

            // newComment.className = "d-flex";
            // newComment.querySelectorAll("div")[0].className = "flex-shrink-0"; // 1st div
            // newComment.querySelectorAll("div")[0].innerHTML = newCom.uid;

            // newComment.querySelectorAll("div")[1].className = "flex-grow-1";
            // newComment.querySelector('p').innerHTML = newCom.comment;
            // document.getElementById("comments").appendChild(newComment);
        }).catch(err => {
            console.log(err.message);
        });
        // let data = await res.json();
    }

    async addFav() {
        let myObjData = { uid: this.props.uid, location: this.state.location.name };
        if (this.state.inFav) {
            fetch(BACK_END + 'favlist', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(myObjData)
            }).then(res => {
                if (res.status === 204) {
                    return res.text();
                } else {
                    throw new Error("Error in removing from fav list");
                }
            }).then(msg => {
                alert("Successfully delete the location from the favorite list");
                this.setState({ inFav: false });
            }).catch(err => {
                console.log(err.message);
            });         //send the param in url get a res of sucess or not
        } else {
            fetch(BACK_END + 'favlist', {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'text/plain'
                },
                body: JSON.stringify(myObjData)
            }).then(res => {
                if (res.status === 201) {
                    return res.text();
                } else {
                    throw new Error("Error in adding the location to fav list");
                }
            }).then(msg => {
                alert(msg);
                this.setState({ inFav: true });
            }).catch(err => {
                console.log(err.message);
            });         //send the param in url get a res of sucess or not
        }
    }

    render() {
        return (
            <>
                <div className='d-flex'>
                    <div className='w-50 m-4'>
                        <SmallMap lon={this.state.location.lon} lat={this.state.location.lat} />
                    </div>
                    <div className='flex-grow-1 m-4'>
                        <div id='details' className='p-2 mb-4 bg-light'>
                            <h3>{this.state.location.name}:</h3>
                            <small className='text-muted'>Last Update Time: {this.state.weather.last_updated}</small>
                            <ul class="list-group">
                                <li className="list-unstyled">Longitude: {this.state.location.lon.toString().replace('.', '°')}E</li>
                                <li className="list-unstyled">Latitude: {this.state.location.lat.toString().replace('.', '°')}N</li>
                                <li className="list-unstyled">Temperature: {this.state.weather.temp_c}<span>&#8451;</span></li>
                                <li className="list-unstyled">Wind Speed: {this.state.weather.wind_kph}km/h</li>
                                <li className="list-unstyled">Wind Direction: {this.state.weather.wind_dir}</li>
                                <li className="list-unstyled">Humidity: {this.state.weather.humidity}</li>
                                <li className="list-unstyled">Precipitation: {this.state.weather.precip_mm}mm</li>
                                <li className="list-unstyled">Visibility: {this.state.weather.vis_km}km</li>
                            </ul>
                        </div>
                        {!this.state.inFav ? <button type="button" className="btn btn-outline-success me-2" onClick={this.addFav}>Add to My Favourite</button>
                            : <button type='button' className="btn btn-success me-2" onClick={this.addFav}>Remove from My Favourite</button>}
                        <div id="comments" className='my-4 p-2 bg-light'>
                            <h3>Comments:</h3>
                            {this.state.comments.map((comm, index) =>
                                <div className="d-flex" key={index}>
                                    <div className="flex-shrink-0"> {comm.user + ":"} </div>
                                    <div className="flex-grow-1">
                                        <p>{comm.comment}</p>
                                    </div>
                                </div>
                            )}
                        </div>
                        <div>
                            <h3>Add Comments:</h3>
                            <div className="mb-3">
                                <label htmlFor="new-comment" className="form-label">Comment:</label>
                                <textarea className="form-control" id="new-comment" rows="3"></textarea>
                            </div>
                            <button type="button" className="btn btn-outline-success me-2" onClick={this.addComment}>Add comment</button>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

class SmallMap extends React.Component {

    // constructor(){
    //     super()
    //     this.state = {
    //         lon:110,
    //         lat:22,
    //         zoom:2
    //     };
    // }

    // async fetchLoc(){
    // // ftech location infomation for map
    // const name = window.location.pathname.split('/')[1]
    // let locres = await fetch(BACK_END + 'loc/'+name,{
    //     method:'GET',
    //     headers: { 
    //       'Content-Type': 'application/json',
    //       'Accept': 'application/json'
    //     }
    //   });
    //   let loc = await locres.json();
    //   this.setState(loc);
    // }

    // async componentWillMount(){
    //     this.fetchLoc();
    // }

    render() {
        return (
            <ReactMapGL
                initialViewState={{
                    longitude: 110,
                    latitude: 22,
                    zoom: 2
                }}
                style={{ width: '50vw', height: '100vh' }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={MAPBOX_TOKEN}
            >
                <Marker longitude={this.props.lon} latitude={this.props.lat} anchor="bottom">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="red" className="bi bi-geo-alt" viewBox="0 0 16 16">
                        <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z" />
                        <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z" />
                    </svg>
                    
                </Marker>
            </ReactMapGL>
        )
    }
}
export default Detail;
