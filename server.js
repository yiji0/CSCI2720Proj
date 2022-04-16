const express = require('express');
const app = express();

const cors = require('cors'); app.use(cors());

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

app.use(express.json());

const mongoose = require('mongoose');
const { send } = require('express/lib/response');
mongoose.connect('mongodb+srv://stu124:p280948-@csci2720.m2qbq.mongodb.net/stu124');

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', function () {
    console.log("Connection is open...");

    const LocationSchema = mongoose.Schema({
        name: { type: String, required: true, unique: true },
        lat: { type: mongoose.Types.Decimal128, required: true },
        lon: { type: mongoose.Types.Decimal128, required: true },
        comment: [{
            uid: { type: String, required: true, unique: true },
            content: { type: String, required: true }
        }]
    });

    const WeatherSchema = mongoose.Schema({
        loc: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' },
        temp_c: { type: mongoose.Types.Decimal128, required: true },
        wind_kph: { type: mongoose.Types.Decimal128, required: true },
        wind_dir: { type: String, required: true },
        humidity: { type: Number, required: true },
        precip_mm: { type: mongoose.Types.Decimal128, required: true },
        vis_km: { type: Number, required: true }
    });

    const UserSchema = mongoose.Schema({
        id: { type: String, required: true, unique: true },
        pwd: { type: String, required: true },
        fav_loc: { type: mongoose.Schema.Types.ObjectId, ref: 'Location' }
    });

    const AdminSchema = mongoose.Schema({
        id: { type: String, required: true, unique: true },
        pwd: { type: String, required: true }
    });

    const Location = mongoose.model('Location', LocationSchema);

    const Weather = mongoose.model('Weather', WeatherSchema);

    const User = mongoose.model('User', UserSchema);

    const Admin = mongoose.model('Admin', AdminSchema);

    app.get('/test', (req, res) => {
        Admin.create({
            id: 'test02',
            pwd: 'abcdef'
        }, (err, user) => {
            if (err)
                res.send(err);
            else
                res.send('Admin created successfully!\n' + user);
        });
    });

    app.post('/login', (req, res) => {
        let _uid = req.body['uid'];
        let _pwd = req.body['pwd'];

        Admin.findOne({id: _uid}, (err, val) => {
            if (err)
                res.send(err);
            else {
                if (val != null && _pwd == val.pwd) {
                    res.send('Login Successfully!\n');
                } else {
                    res.send("Incorrect Account or Password.\n");
                }
            }
        });
    });

    app.all('/*', (req, res) => {
        res.send("Welcome!");
    });
});

const server = app.listen(3000);