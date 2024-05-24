Web3Js Plugin for Bundle APIs (BEP-322)
===========

This plugin provides enhanced transaction privacy and atomicity for the BNB Smart Chain (BSC) network. By implementing the BEP322 standard, the following capabilities are provided:
1. Privacy. All transactions sent through this API will not be propagated on the P2P network, hence, they won't be detected by any third parties. This effectively prevents transactions from being targeted by sandwich attacks.
2. Batch transaction. Multiple transactions can be consolidated into a single 'bundle', which can then be transmitted through just one API call. The sequence of transactions within a block, as well as the order within a bundle, can be assured to maintain impeccable consistency.
3. Atomicity. Transactions within a bundle either all get included on the chain, or none at all. There's no such scenario where only a portion of the transactions are included on chain.
4. Gas protection. If a single transaction within a bundle fails, the entire bundle is guaranteed not to be packaged onto the blockchain. This mechanism safeguards users from unnecessary gas expenditure.

This API service is built on top of BSC MEV. Explore [here](https://docs.bnbchain.org/docs/mev/overview/) for more details.

Refer [here](https://nodereal.io/api-marketplace/bsc-bundle-service-api) to subscribe those Apis.

Refer [here](https://docs.nodereal.io/reference/bsc-bundle-service-api) to get details about those Apis

## Installation
```bash
pnpm i @node-real/web3-plugin-bundle
```

## Usage

For full example, please refer test/index.test.ts, you should configure three env variables:

APIKEY:       your nodereal apikey

Address:      the to address of transactions

PrivateKey:   your wallet privateKey, which used for signing transaction

### Register plugin
```typescript
import {Web3BundlePlugin} from 'web3-plugin-bundle';
web3 = new Web3(/* provider here */);
web3.registerPlugin(new Web3BundlePlugin());
```

### Methods

```typescript
import * as process from "process";
import { Web3, core, HexString } from "web3";
import { Address, Transaction } from "web3-types";
import { SendBundleArg, Web3BundlePlugin } from "../src";

// set your endpoint with apikey
const endpointUrl = "https://bsc-testnet.nodereal.io/v1/{{your nodereal apikey}}"

// assign your privateKey
const privateKey = "your private key"

// register bundle plugin
web3 = new Web3(endpointUrl);
web3.registerPlugin(new Web3BundlePlugin());

// prepare bundle
const address: Address = process.env.Address as Address;
const nonce = await web3.eth.getTransactionCount(address, "latest");
const txs: string[] = [];

for (let i = 0; i < 3; i++) {
	const tx: Transaction = {
		from: address,
		to: address,
		value: web3.utils.toWei(0.0001, "ether"),
		gas: 0x17530,
		gasPrice: 0x12a05f200,
		nonce: nonce + BigInt(i),
	};
	// sign your tx
	const signedTx = await web3.eth.accounts
	.signTransaction(tx, privateKey)
	.catch((reason: any) => {
		console.error(reason);
	});
	txs.push(signedTx.rawTransaction);
}

const bundle: SendBundleArg = {
	txs: txs,
	maxBlockNumber: 0,
};

// send bundle
const bundleHash = await web3.bundle
.sendBundle(bundle)
.catch((reason: any) => {
	console.error(reason);
});

// query bundle by bundleHash
const bundleObj = await web3.bundle
.queryBundle(bundleHash)
.catch((reason: any) => {
	console.error(reason);
});

// query bundlePrice
const bundlePrice = await web3.bundle
.bundlePrice()
.catch((reason: any) => {
	console.error(reason);
});

// query builders
const builders = await web3.bundle
.builders()
.catch((reason: any) => {
	console.error(reason);
});

const validators = await web3.bundle
.validators()
.catch((reason: any) => {
	console.error(reason);
});
```

Contributing
------------

Pull requests are welcome. For major changes, please open an issue first
to discuss what you would like to change.

Please make sure to update tests as appropriate.

License
-------

[MIT](https://choosealicense.com/licenses/mit/)