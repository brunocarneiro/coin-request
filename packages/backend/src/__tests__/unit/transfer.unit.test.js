let TransfersManager = require('../../bitgo/TransfersManager');

test('10% balance calculation using eth wallet', (done) => {
  let tenPercent = TransfersManager._getTenPercentOfBalance(mockEthWallet());
  expect(tenPercent).toBe('123456789');
  done();
});

test('10% balance calculation using btc wallet', (done) => {
  let tenPercent = TransfersManager._getTenPercentOfBalance(mockBTCWallet());
  expect(tenPercent).toBe(1234);
  done();
});


function mockEthWallet(){
  return {
    balance: function(){
      return null;
    },
    balanceString: function(){
      return "1234567890";
    }
  }
}

function mockBTCWallet(){
  return {
    balance: function(){
      return 12340;
    },
    balanceString: function(){
      return null;
    }
  }
}
