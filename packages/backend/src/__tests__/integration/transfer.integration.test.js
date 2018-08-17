const BitGoSession = require('../../services/bitgo/BitGoSession');
const {TEST_TIMEOUT} = require('./integrationConstants');
const { RICH_WALLET_ID, POOR_WALLET_ADDRESS } = require('../bitgoTestConstants');

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

test('wrong wallet address', (done) => {
  bitGoSession.transfers().send({from: RICH_WALLET_ID, to: "123"}).then((transaction)=>{
    expect("Passed here").toBe("should not passed here");
    done();
  }).catch((e)=>{
    expect(e).toBeDefined();
    expect(e.message).toBe("invalid address");
    done();
  })
});

test('From wallet does not have enough money', (done) => {
  bitGoSession.wallets().get(RICH_WALLET_ID).then((wallet)=>{
    let balance = wallet.balanceString();
    balance += "1";
    bitGoSession.transfers().send({from: RICH_WALLET_ID, to: POOR_WALLET_ADDRESS, amount: balance}).then((transaction)=>{
      expect("Passed here").toBe("should not passed here");
      done();
    }).catch((e)=>{
      expect(e).toBeDefined();
      expect(e.message).toBe("insufficient balance");
      done();
    })
  });
});

debugger;
