const BitGoJS = require('bitgo');
const {ACCESS_TOKEN, ORIGIN_ADDRESS, ORIGIN_ID, WALLET_PASSPHRASE, ENTERPRISE_ID} = require('./constants');

var bitgo = new BitGoJS.BitGo({ env: 'test', accessToken: ACCESS_TOKEN});

function transfer(to){

  getWallet(ORIGIN_ID).then((wallet)=>{
    console.log(wallet);
    console.log(wallet.balance());
    let params = {
      amount: "119999999949888",
      address: to,
      walletPassphrase: WALLET_PASSPHRASE
    };

    unlock().then((unlockResponse)=>{
      wallet.send(params)
      .then(function(transaction) {
        console.log(transaction);
      });
    });
  });
}

function getWallet(walletId){
  return bitgo.coin('teth').wallets().get({ id: walletId })
}

function unlock(){
  return new Promise((resolve, reject)=>{
    bitgo.session().then((session)=>{
      if(session.unlock){
        resolve();
      } else {
        bitgo.unlock({ otp: '200686'}).then((unlockResponse)=>{
          resolve();
        }).catch((err)=>{
          reject(err);
        });
      }
    }).catch((err)=>{
      reject(err);
    });
  })
}

function generateWallet(){
  return new Promise((resolve, reject)=>{
    coin.wallets()
      .generateWallet({ label: 'My API Generated Wallet', passphrase: WALLET_PASSPHRASE, enterprise: ENTERPRISE_ID })
      .then(function(wallet) {
        console.dir(wallet);
        resolve(wallet);
      });
  });
}

transfer("0x1ebc36b396ca0c37c6d701985314935e73ce47cd");