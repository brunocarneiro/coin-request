const civicSip = require('civic-sip-api');
const { CIVIC_APP_ID, CIVIC_PRIV_KEY, CIVIC_APP_SECRET } = require('../secureConstants');

class CivicService {
  constructor(){
    this.civicClient = null;
    this.init();
  }

  init(){
    this.civicClient = civicSip.newClient({
      appId: CIVIC_APP_ID,
      prvKey: CIVIC_PRIV_KEY,
      appSecret: CIVIC_APP_SECRET
    });
  }

  login(jwtToken){
    return this.civicClient.exchangeCode(jwtToken);
  }
}

module.exports = new CivicService();