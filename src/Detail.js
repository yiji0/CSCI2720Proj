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
            user: 'uid01', // how we know the user,
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

    async function addFav(){
        const url = window.location.href;
        const res = await fetch(url,{
            method: 'POST'
        }); //send the param in url get a res of sucess or not
        alert(res.text()=='sucess'? 'Added to your favorite':'Something wrong');
    }

    return(
        <div className='d-flex'>
        <div className='w-50 m-4'>
            <SmallMap info={data.location}/>
        </div>
        <div className='flex-grow-1 m-4'>
            <div id ='details' className='p-2 mb-4 bg-light'>
                <h3>Location details:</h3>
                <ul>
                    <li>{data.temp_c}</li>
                    <li>{data.wind_kph}</li>
                </ul>
            </div>
            <button type="button" className="btn btn-outline-success me-2" onClick={addFav}>Add to My Favourite</button>
            <div id="comments" className='my-4 p-2 bg-light'> 
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
                    <label for="new-comment" className="form-label">Comment:</label>
                    <textarea className="form-control" id="new-comment" rows="3"></textarea>
                </div>
                <button type="button" className="btn btn-outline-success me-2" onClick={addComment}>Add comment</button>
            </div>
        </div>
        </div>
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
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-geo-alt" viewBox="0 0 16 16">
            <path d="M12.166 8.94c-.524 1.062-1.234 2.12-1.96 3.07A31.493 31.493 0 0 1 8 14.58a31.481 31.481 0 0 1-2.206-2.57c-.726-.95-1.436-2.008-1.96-3.07C3.304 7.867 3 6.862 3 6a5 5 0 0 1 10 0c0 .862-.305 1.867-.834 2.94zM8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10z"/>
            <path d="M8 8a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 1a3 3 0 1 0 0-6 3 3 0 0 0 0 6z"/>
            </svg>
            </Marker>
            </ReactMapGL>
        )
    }
}
  export default Detail;