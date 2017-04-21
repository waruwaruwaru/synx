//Main starting point of the application
const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const app = express();
const router = require('./router');
const mongoose = require('mongoose');
const cors = require('cors');

//DB Setup
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:synx/synx');

//App, all about getting express working
//morgan and bodyParser are both middlewares, any incoming request will go to them. app.use register them as middlewares
//morgan is a logging middleware that logs the detail of the machine doing the request
//bodyParser is a middleware that parse incoming request. It parse them into JSON no matter the request type is
//cors is a middleware that lets other domain make a request to our domain.
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*'}));
router(app);

//Server, getting express to talk to outside world

const port = process.env.PORT || 3090;
//This http.createServer lets you create a server that knows how to receive a request and forward it
//to express application
const server = http.createServer(app);
server.listen(port);
console.log('Server listening to:', port);
