import { Web3, core, HexString } from "web3";
import { SendBundleArg, Web3BundlePlugin } from "../src";
import * as process from "process";
import { Address, Transaction } from "web3-types";

const endpointUrl = "https://bsc-testnet.nodereal.cc/v1/" + process.env.APIKEY;

describe("Web3BundlePlugin Tests", () => {
  it("should register Web3BundlePlugin plugin on Web3Context instance", () => {
    const web3Context = new core.Web3Context(endpointUrl);
    web3Context.registerPlugin(new Web3BundlePlugin());
    expect(web3Context.bundle).toBeDefined();
    console.log(process.env);
  });

  describe("Web3BundlePlugin method tests", () => {
    let consoleSpy: jest.SpiedFunction<typeof global.console.log>;

    let web3: Web3;

    beforeAll(() => {
      web3 = new Web3(endpointUrl);
      web3.registerPlugin(new Web3BundlePlugin());
      consoleSpy = jest.spyOn(global.console, "log").mockImplementation();
    });

    afterAll(() => {
      consoleSpy.mockRestore();
    });

    it("test bundle api eth_builders", async () => {
      const builders = await web3.bundle.builders(web3.requestManager);
      console.log(builders);
    });

    it("test bundle api eth_validators", async () => {
      const validators = await web3.bundle.builders(web3.requestManager);
      console.log(validators);
    });

    it("test bundle api eth_bundlePrice", async () => {
      const bundlePrice = await web3.bundle.bundlePrice(web3.requestManager);
      console.log(bundlePrice);
    });

    it("test bundle api eth_queryBundle", async () => {
      const builders = await web3.bundle.queryBundle(
        web3.requestManager,
        "0x3ce7867633b874f8f181cc527ceeba6c70adb1927a6911e40398bdb312172ddb"
      );
      console.log(builders);
    });

    it("test bundle api eth_sendBundle", async () => {
      const privateKey = web3.utils.hexToBytes(process.env.PrivateKey as HexString);
      const address: Address = process.env.Address as Address;

      const nonce = await web3.eth.getTransactionCount(address, "latest");

      console.log(nonce);

      let txs: string[] = [];

      for (let i = 0; i < 3; i++) {
        const tx: Transaction = {
          from: address,
          to: address,
          value: web3.utils.toWei(0.0001, "ether"),
          gas: 0x7530,
          gasPrice: 0x12a05f200,
          nonce: nonce + BigInt(i),
        };
        const signedTx = await web3.eth.accounts.signTransaction(
          tx,
          privateKey
        );
        txs.push(signedTx.rawTransaction);
      }

      const bundle: SendBundleArg = {
        txs: txs,
        maxBlockNumber: 0,
      };
      const bundleHash = await web3.bundle.sendBundle(
        web3.requestManager,
        bundle
      );
      console.log(bundleHash);
    });
  });
});
