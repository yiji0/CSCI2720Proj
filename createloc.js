// Initialize the location database


const fetch = require('node-fetch')
const express = require('express');
const app = express();

const cors = require('cors'); app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.json());


const mongoose = require('mongoose');
const { send } = require('express/lib/response');
mongoose.connect('mongodb+srv://stu124:p280948-@csci2720.m2qbq.mongodb.net/stu124');
// mongoose.connect('mongodb://localhost:27017/');


const weather_key = 'bced98796b384bf0a55111054221604';

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function () {
    console.log("Connection is open...");

    const LocationSchema = mongoose.Schema({
        name: { type: String, required: true, unique: true },
        lat: { type: mongoose.Types.Decimal128, required: true },
        lon: { type: mongoose.Types.Decimal128, required: true },
        comment: [{
            uid: { type: String, required: true},
            content: { type: String, required: true }
        }]
    });

    const Location = mongoose.model('Location', LocationSchema);

    locations = ['Hong Kong', 'Beijing', 'Shanghai', 'Harbin', 'Lhasa',
    'Urumchi', 'Seoul', 'Tokyo', 'Hohhot', 'Singapore City', 'Chengdu', 
    'Changsha', 'Kunming', 'Sanya','Taipei'];
    console.log(locations);
    for (let loc of locations) {
        const weather_url = "http://api.weatherapi.com/v1/current.json?key="
                    + weather_key + "&q=" + loc + "&aqi=no";
        console.log(weather_url);
        fetch(weather_url).then(res => {
            // console.log(res);
            return res.json();
        }).then(data => {
            // console.log(data);
            console.log("Location: " + data['location']['name'] + " Lat: " + data['location']['lat'] + " Lon: " + data['location']['lon']);
            Location.create({
                name: data['location']['name'],
                lat: data['location']['lat'],
                lon: data['location']['lon'],
                comments: [{uid:"", content:""}]
            }, (err, loc) => {
                if (err)
                    console.log(err.message);
                else
                    console.log('Successfully created');
            });
        }).catch(err => {
            console.log(err);
        })
    }
});

const server = app.listen(3000);