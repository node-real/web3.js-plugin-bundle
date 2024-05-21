Web3Js Plugin for Bundle APIs (BEP-322)
===========

This package provides enhanced transaction privacy and atomicity for the BNB Smart Chain (BSC) network. By implementing the BEP322 standard, which provides a new mechanism of sending transactions in batches and preventing sandwich attacks.


## Installation
```bash
npm i web3-plugin-bundle
```

## Usage

### Register plugin
```typescript
import {Web3BundlePlugin} from 'web3-plugin-bundle';
web3 = new Web3(/* provider here */);
web3.registerPlugin(new Web3BundlePlugin());
web3.defaultChain = 'bsc'; // set chain which support blob transactions
```

### Methods

#### sendTransaction
```typescript
// add account to sign transaction
const acc = web3.eth.accounts.privateKeyToAccount(String(process.env.PRIVATE_KEY));
web3.eth.accounts.wallet.add(acc);

nonce = await web3.eth.getTransactionCount(acc.address)

const bundleData = {
	tx: [
		"0x....",
		"0x....",
		"0x....",
		"0x....",
    ],
	maxBlockNumber: 40519017,
};

// or supribe to events
const res = web3.bundle.sendBundle(bundleData);
res.on('sending', data => {
	console.log('sending', data);
});

res.on('sent', data => {
	console.log('sent', data);
});

res.on('receipt', receipt => {
	console.log('receipt', receipt);
});

res.on('transactionHash', hash => {
	console.log('hash', hash);
});

res.on('error', error => {
	console.log('error', error);
});

res.on('confirmation', data => {
	console.log('confirmation', data);
});

const receipt = await res; // and get receipt here

```

Contributing
------------

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

License
-------

[MIT](https://choosealicense.com/licenses/mit/)