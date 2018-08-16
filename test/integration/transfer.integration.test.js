const BitGoSession = require('../../src/bitgo/BitGoSession');
const {TEST_TIMEOUT} = require('./integrationConstants');
const { RICH_WALLET_ID, POOR_WALLET_ADDRESS } = require('../../src/constants');

const bitGoSession = new BitGoSession();
bitGoSession.openSession();

beforeAll(() => {
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
