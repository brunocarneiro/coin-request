const express = require('express');
const requestEndpoint = require('./requestEndpoint');
const { SERVER_LISTEN_PORT } = require('../constants');
const app = express();

if(process.env.NODE_ENV == 'production'){
  module.exports.requestEndpoint = requestEndpoint;
} else {
  app.post('/requestEndpoint', requestEndpoint);
  app.listen(SERVER_LISTEN_PORT);
}
