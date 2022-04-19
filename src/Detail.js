import React from 'react';
import ReactMapGL, {Marker} from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';


const MAPBOX_TOKEN = 'pk.eyJ1Ijoic3V2aWFicyIsImEiOiJjbDFydWlkamkyMHk1M2xtbW1sb2p0a3hpIn0.8V0sfF1FRYSn4B0n-m1vAg';


// class Detail extends React.Component{
//     constructor(props){
//         super();
//         this.state={
//             comments:[
//                 {user:'unername', comment:'this is very nice'},
//                 {user:'unsername2', comment:'this is also very nice'}        
//             ],
//             temp_c:0,
//             wind_kph:0,
//             wind_dir:null,
//             humidity:0,
//             precip_mm:0,
//             vis_km:0,
//             location:{
//                 name:null,
//                 lon:0,
//                 lat:0
//             }
//         }
//     }
    
//     async componentDidMount(){
//         const url = window.location.href;
//         const response = await fetch(url);
//         const data = await response.json();
//         this.setState({
//             comments:data.comments, 
//             temp_c:data.temp_c, 
//             wind_kph:data.wind_kph, 
//             wind_dir:data.wind_dir, 
//             humidity:data.humidity,
//             precip_mm:data.precip_mm,
//             vis_km:data.vis_km
//         });
//     }

//     render(){
//         return(
//             <div>
//                 <div>{this.state.temp_c}</div>
//                 <div>{this.state.wind_kph}</div>
//                 <div>{this.state.comment}</div>
//                 <SmallMap info={this.state.location}/>
//             </div>
//         );
//     }
    
// }


function Detail(){
    let data = {
        comments:[
            {user:'unername', comment:'this is very nice'},
            {user:'unsername2', comment:'this is also very nice'}        
        ],
        temp_c:"TBD",
        wind_kph:"TBD",
        wind_dir:null,
        humidity:0,
        precip_mm:0,
        vis_km:0,
        location:{
            name:null,
            lon:0,
            lat:0
        }
    };

    async function addComment(){
        const newCom = {
            user: 'username1', // how we know the user,
            comment: document.getElementById('new-comment').value
        };
        let res = await fetch('http://localhost:8000/detail/newcomm',{
            method: 'POST',
            body: JSON.stringify(newCom),
            headers: {
                'Content-Type': 'application/json'
            },
        });
        let data = await res.json();
        let newComment = document.createElement("div");
        let element = '<div></div><div><p></p></div>'
        newComment.innerHTML = element;

        newComment.className = "d-flex";
        newComment.querySelectorAll("div")[0].className = "flex-shrink-0"; // 1st div
        newComment.querySelectorAll("div")[0].innerHTML = data.user;

        newComment.querySelectorAll("div")[1].className = "flex-grow-1";
        newComment.querySelector('p').innerHTML = data.comment;
        document.getElementById("comments").appendChild(newComment); 

    }

    return(
        <>
        <div id ='details'>
            <h3>Location details:</h3>
            <ul>
                <li>{data.temp_c}</li>
                <li>{data.wind_kph}</li>
            </ul>
        </div>
        <div id="comments"> 
            <h3>Comments:</h3>
            {data.comments.map((comm,index)=>
                <div className="d-flex" key={index}> 
                    <div className="flex-shrink-0"> {comm.user} </div>
                    <div className="flex-grow-1">
                        <p>{comm.comment}</p>
                    </div>
                </div>
            )}
        </div>
        <div>
            <h3>Add Comments:</h3>
            <div className="mb-3">
                <label for="new-comment" className="form-label">Comment</label>
                <textarea className="form-control" id="new-comment" rows="3"></textarea>
            </div>
            <button type="button" className="btn btn-success" onClick={addComment}>Add comment</button>
        </div>
        <SmallMap info={data.location}/>
        </>
    )
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