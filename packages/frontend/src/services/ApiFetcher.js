import { REST_API_URL } from "../constants";

class ApiFetcher {

  request(walletAddress){
    
    return fetch(`${REST_API_URL}/requestEndpoint?address=${walletAddress}`,
      {
        method: "POST", headers: {"Content-Type": "application/json; charset=utf-8"},
      }
    );
  }
}

export default new ApiFetcher;