const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv').config();
const http = require('http');
const morgan = require('morgan');

const app = express();

app.use(express.static('dist/weather'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(cors());

app.set('port', 8081);

var server = http.createServer(app);

app.listen(8081, (err) => {
    console.log("listtening on port 8081");
})