const transferService = require('../services/TransferService');

function requestEndpoint(req, resp){

  if(req.method && req.method.toUpperCase() === 'OPTIONS') {
    return prepareResponse(resp, 200).send();
  }

  let params = req.query;
  let validationMessage = validateRequest(params);
  if(validationMessage == true){
    transferService.transfer(params).then((transfer)=>{
      prepareResponse(resp, 200, {success: transfer});
    }).catch((e)=>{
      console.error(e);
      prepareResponse(resp, 500, e);
    });
  } else {
    prepareResponse(resp, 400, {error: validationMessage});
  }
}

function validateRequest(params){
  if(!params.address){
    return "Address is a required parameter";
  }
  if(!params.auth){
    return "You must authenticate using Civic app";
  }
  return true;
}

function prepareResponse(res, status, body){
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, OPTIONS, DELETE');
  res.status(status).send(body);
}

module.exports = requestEndpoint;