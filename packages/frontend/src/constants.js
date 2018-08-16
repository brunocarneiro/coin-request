let restApiUrl;
let host = window.location.host;

if(host.indexOf("localhost")>=0 || host.indexOf("127.0.0.1")>=0){
  restApiUrl = "http://localhost:4000";
} else {
  restApiUrl = "https://us-central1-faucet-giver-213520.cloudfunctions.net";
}

export const REST_API_URL = restApiUrl;