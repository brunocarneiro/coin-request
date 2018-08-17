const BitGoJS = require('bitgo');

const { ACCESS_TOKEN } = require('../secureConstants');
const WalletsManager = require('./WalletsManager');
const TransfersManager = require('./TransfersManager');

const DEFAULT_COIN = 'teth';

class BitGoSession {

  constructor(){
    this.bitgo = null;
    this._coin = DEFAULT_COIN;
  }

  openSession(){
    this.bitgo = new BitGoJS.BitGo({ env: 'test', accessToken: ACCESS_TOKEN});
  }

  unlock(){
    return new Promise((resolve, reject)=>{
      this.bitgo.session().then((session)=>{
        if(session.unlock){
          resolve();
        } else {
          this.bitgo.unlock({ otp: '0000000'}).then((unlockResponse)=>{
            resolve(unlockResponse);
          }).catch((err)=>{
            reject(err);
          });
        }
      }).catch((err)=>{
        reject(err);
      });
    })
  }

  setCoin(coinName){
    this._coin = coinName;
  }

  coin(){
    return this.bitgo.coin(this._coin);
  }

  get(){
    return this.bitgo;
  }

  wallets(){
    return new WalletsManager(this);
  }

  transfers(){
    return new TransfersManager(this);
  }

}

module.exports = BitGoSession;