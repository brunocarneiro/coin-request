const { WALLET_PASSPHRASE, ENTERPRISE_ID } = require('../bitgoConstants');

class WalletsManager{

  constructor(session){
    this.session = session;
  }

  _wallets(){
    return this.session.coin().wallets();
  }

  create({label, passphrase, enterprise}={label, passphrase: WALLET_PASSPHRASE, enterprise: ENTERPRISE_ID}){
    return this._wallets()
      .generateWallet({ 
        label: label, 
        passphrase: passphrase || WALLET_PASSPHRASE, 
        enterprise: enterprise || ENTERPRISE_ID
      });
  }

  get(wallet){
    return new Promise((resolve, reject)=>{
      if(typeof wallet === "string"){
        this._wallets().get({ id: wallet }).then((wallet)=>{
          resolve(wallet);
        }).catch((e)=>{
          reject(e);
        });
      } else {
        if(wallet.wallet != null){
          resolve(wallet.wallet);
        } else {
          resolve(wallet);
        }
      }
    });

  }

  freeze(walletId){
    return new Promise((resolve, reject)=>{
      this.get(walletId).then((wallet)=>{
        this.session.unlock().then(()=>{
          wallet.freeze({ otp: '0000000' }).then(function(freeze) {
            resolve(freeze);
          }).catch((e)=>{
            reject(e);
          });
        }).catch((e)=>{
          reject(e);
        });
      }).catch((e)=>{
        reject(e);
      });
    });
  }
}

module.exports = WalletsManager;