const BitGoSession = require('../bitgo/BitGoSession');

function requestEndpoint(req, resp){

  let params = req.query;
  let validationMessage = validateRequest(params);
  if(validationMessage == true){
    let bitGoSession = new BitGoSession();
    bitGoSession.openSession();
    bitGoSession.transfers().send({to: params.address}).then((transfer)=>{
      resp.status(200).send({success: transfer});
    }).catch((e)=>{
      console.error(e);
      resp.status(500).send(e);
    });
  } else {
    resp.status(400).send({error: validationMessage});
  }
}

function validateRequest(params){
  if(!params.address){
    return "Address is a required parameter";
  }
  return true;
}

module.exports = requestEndpoint;