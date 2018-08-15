let BitGoSession = require('../../src/bitgo/BitGoSession');
let {TEST_TIMEOUT} = require('./constants');
let { RICH_WALLET_ID, POOR_WALLET_ADDRESS } = require('../../src/constants');

let bitGoSession = new BitGoSession();
bitGoSession.openSession();

beforeAll(() => {
  console.log("Setting new Timeout")
  jest.setTimeout(TEST_TIMEOUT);
});

test('successfull transaction', (done) => {
  bitGoSession.transfers().send({from: RICH_WALLET_ID, to: POOR_WALLET_ADDRESS}).then((transaction)=>{
    expect(transaction).toBeDefined();
    expect(transaction.txid).toBeDefined();
    expect(transaction.tx).toBeDefined();
    expect(transaction.status).toBe('signed');
    done();
  }).catch((e)=>{
    console.error(e);
    expect("Passed here").toBe("should not passed here");
    done();
  })
});

debugger;

// function insufficientFunds(){
//   bitGoSession.transfers().send({from: RICH_WALLET_ID, to: POOR_WALLET_ADDRESS}).then(()=>{
//     console.log("Sucesso");
//   }).catch((e)=>{
//     console.error(e);
//   })
// }
