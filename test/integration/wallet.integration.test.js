let BitGoSession = require('../../src/bitgo/BitGoSession');

let bitGoSession = new BitGoSession();
bitGoSession.openSession();

beforeAll(() => {
  console.log("Setting new Timeout")
  jest.setTimeout(TEST_TIMEOUT);
});

debugger;

function testCreateWallet(){
  test('wallet creation successfully', (done) => {
    let walletsManager = bitGoSession.wallets();
    let label = "Test Wallet " + Date.now();
    console.log(label)
    walletsManager.create({
      label
    }).then((wallet)=>{
      expect(wallet).toBeDefined();
      expect(wallet.backupKeychain).toBeDefined();
      expect(wallet.bitgoKeychain).toBeDefined();
      expect(wallet.wallet).toBeDefined();
      walletsManager.freeze(wallet).then((freeze)=>{
        console.log(freeze);
        expect(freeze).toBeDefined();
        done();
      }).catch((e)=>{
        console.error(e);
        expect("Passed here").toBe("should not passed here");
        done();
      });
    }).catch((e)=>{
      console.error(e);
      expect("Passed here").toBe("should not passed here");
      done();
    });
  });
}


function testFreezeWallet(wallet){
  test('freezing wallet successfully', (done) => {
    bitGoSession.wallets().freeze(wallet).then((freeze)=>{
      console.log(freeze);
      expect(freeze).toBeDefined();
      done();
    }).catch((e)=>{
      expect("Passed here").toBe("should not passed here");
      done();
    });
  });
}

function suite(){
  testCreateWallet();
}

suite();

// function c(){
//   let walletsManager = bitGoSession.wallets();
//   let label = "Test Wallet " + Date.now();
//   walletsManager.create({
//     label
//   }).then((wallet)=>{
//     walletsManager.freeze(wallet).then((freeze)=>{
//       console.log(freeze)
//     }).catch((e)=>{
//       console.error(e);
//     });
//   }).catch((e)=>{
//     console.error(e);
//   });
// }
