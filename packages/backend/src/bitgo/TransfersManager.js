const { RICH_WALLET_ID, WALLET_PASSPHRASE } = require('../bitgoConstants');

class TransfersManager {

  constructor(session){
    this.session = session;
  }

  send({from=RICH_WALLET_ID, to, fromPassphrase=WALLET_PASSPHRASE, amount}){
    return new Promise((resolve, reject)=>{
      this.session.wallets().get(from).then((wallet)=>{
        let params = {
          amount: amount || TransfersManager._getTenPercentOfBalance(wallet),
          address: to,
          walletPassphrase: fromPassphrase
        };
    
        this.session.unlock().then((unlockResponse)=>{
          wallet.send(params)
          .then(function(transaction) {
            console.log(transaction);
            resolve(transaction);
          }).catch((e)=>{
            reject(e);
          });
        }).catch((e)=>{
          reject(e);
        });
      }).catch((e)=>{
        reject(e);
      });;
    });
  }

  static _getTenPercentOfBalance(wallet){
    let balance = wallet.balance() || wallet.balanceString();
    if(typeof balance != "string"){
      return balance*0.1;
    }
    return balance.substring(0, balance.length-1);
  }
}


module.exports = TransfersManager;