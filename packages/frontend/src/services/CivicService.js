import { CIVIC_APP_ID } from '../constants';

let civicSip;

class CivicService {

  constructor(){
    this.init();
  }

  init(){
    this.civicInitIntervalId = setInterval(()=>{
      if(window.civic){
        clearInterval(this.civicInitIntervalId);
        civicSip = new window.civic.sip({ appId: CIVIC_APP_ID });
      }
    }, 100);    
  }

  signup(callback){
    civicSip.signup({ style: 'popup', scopeRequest: civicSip.ScopeRequests.BASIC_SIGNUP });

    // Listen for data
    civicSip.on('auth-code-received', function (event) {
      callback('auth-code-received', event);
    });

    civicSip.on('user-cancelled', function (event) {
      callback('user-cancelled', event);
    });

    civicSip.on('read', function (event) {
      callback('read', event);
    });

    // Error events.
    civicSip.on('civic-sip-error', function (error) {
      callback('civic-sip-error', error);
    });
  }
}

export default new CivicService();