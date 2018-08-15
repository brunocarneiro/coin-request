const express = require('express');
const app = express();
const requestEndpoint = require('./requestEndpoint');
const { SERVER_LISTEN_PORT } = require('../constants');

app.post('/request', requestEndpoint);

app.listen(SERVER_LISTEN_PORT);