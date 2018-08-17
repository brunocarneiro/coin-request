const civicService = require('./CivicService');
const BitGoSession = require('./bitgo/BitGoSession');

class TransferService {
  transfer({auth, address}){
    return new Promise((resolve, reject)=>{
      civicService.login(auth).then((user)=>{
        this._send(address).then((tx)=>{
          if(user && user.data){
            tx.user = user.data[0];
          }
          resolve(tx);
        }).catch((e)=>{
          reject(e);
        });
      }).catch((e)=>{
        reject(e);
      });
    });
  }

  _send(address){
    let bitGoSession = new BitGoSession();
    bitGoSession.openSession();
    return bitGoSession.transfers().send({to: address});
  }
}

module.exports = new TransferService();