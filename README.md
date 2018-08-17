# Faucet Giver

In order to help developers to deploy and test contracts on the Kovan network this app provides Kovan Ether (KEth), that has no market value. Users must authenticate themselves using Civic App to avoid malicious use of this app.

You can get KEth's by visiting https://faucet-giver-213520.firebaseapp.com/

# Contribute
Contributions are welcome!
To get started you need to create an app on [Civic Integration Portal](https://docs.civic.com/) and an account on BitGo.
Then, create a file called secureConstants in the directory packages/backend/src with these constants:

  ```javascript
  module.exports.ACCESS_TOKEN = "[BIT GO ACCESS TOKEN]";
  module.exports.RICH_WALLET_ADDRESS = "[FROM WALLET ADDRES]";
  module.exports.RICH_WALLET_ID = "[FROM WALLET BITGO ID]";

  module.exports.POOR_WALLET_ADDRESS = "[FROM WALLET ADDRES]"; //test porpouse
  module.exports.POOR_WALLET_ID = "[FROM WALLET BITGO ID]"; //test porpouse

  module.exports.WALLET_PASSPHRASE = "[DEFAULT SECRET]"; //test porpouse
  module.exports.ENTERPRISE_ID = "[BITGO ENTERPRISE_ID]"; //test porpouse

  module.exports.SERVER_LISTEN_PORT = 3000;

  module.exports.CIVIC_APP_ID = "[CIVIC_APP_ID]"; 
  module.exports.CIVIC_PRIV_KEY = "[CIVIC_PRIV_KEY]"; 
  module.exports.CIVIC_APP_SECRET = "[CIVIC_APP_SECRET]";
  ```

## Running
### Frontend
```
  cd packages/frontend;
  npm run start
```

### Backend
```
  cd packages/backend;
  npm run start
```
### Tests
```
  npm run test
```