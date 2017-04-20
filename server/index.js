const express = require('express');
const http = require('http');
const bodyParser = require('body-parser');
const morgan = require('morgan');


//App Setup
app.use(morgan('combined'));
app.use(cors());
app.use(bodyParser.json({ type: '*/*'}));

//Server Setup
const port = process.env.PORT || 3090;
const server = http.createServer(app);
server.listen(port);
