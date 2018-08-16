const BitGoSession = require('../../src/bitgo/BitGoSession');
const {TEST_TIMEOUT} = require('./integrationConstants.js');

const bitGoSession = new BitGoSession();
bitGoSession.openSession();

beforeAll(() => {
  jest.setTimeout(TEST_TIMEOUT);
});

debugger;

function testCreateWallet(){
  test('wallet creation successfully', (done) => {
    let walletsManager = bitGoSession.wallets();
    let label = "Test Wallet " + Date.now();

    console.log("Creating wallet named: " + label);

    walletsManager.create({
      label
    }).then((wallet)=>{
      expect(wallet).toBeDefined();
      expect(wallet.backupKeychain).toBeDefined();
      expect(wallet.bitgoKeychain).toBeDefined();
      expect(wallet.wallet).toBeDefined();
      console.log("Created wallet named: " + label);
      
      console.log("Freezing it");
      walletsManager.freeze(wallet).then((freeze)=>{
        console.log("Wallet frozen", freeze);
        expect(freeze).toBeDefined();
        done();
      }).catch((e)=>{
        console.error("Error creating wallet", e);
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
      console.log("Wallet frozen", freeze);
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
