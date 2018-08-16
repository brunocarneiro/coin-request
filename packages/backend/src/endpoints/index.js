const express = require('express');
const requestEndpoint = require('./requestEndpoint');
const { SERVER_LISTEN_PORT } = require('../constants');
const app = express();

app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');
  next();
});

app.post('/request', requestEndpoint);

app.listen(SERVER_LISTEN_PORT);