import * as process from "process";
import { Web3, core, HexString } from "web3";
import { Address, Transaction } from "web3-types";
import { SendBundleArg, Web3BundlePlugin } from "../src";

const endpointUrl = "https://bsc-testnet.nodereal.io/v1/" + process.env.APIKEY;

describe("Web3BundlePlugin Tests", () => {
  it("should register Web3BundlePlugin plugin on Web3Context instance", () => {
    const web3Context = new core.Web3Context(endpointUrl);
    web3Context.registerPlugin(new Web3BundlePlugin());
    expect(web3Context.bundle).toBeDefined();
  });

  describe("Web3BundlePlugin method tests", () => {
    let consoleSpy: jest.SpiedFunction<typeof console.log>;

    let bundleHash: string;

    let web3: Web3;

    console.info(endpointUrl);

    beforeAll(() => {
      web3 = new Web3(endpointUrl);
      web3.registerPlugin(new Web3BundlePlugin());
      consoleSpy = jest.spyOn(console, "log").mockImplementation();
    });

    afterAll(() => {
      consoleSpy.mockRestore();
    });

    it("test bundle api eth_sendBundle", async () => {
      const privateKey = web3.utils.hexToBytes(
        process.env.PrivateKey as HexString
      );
      const address: Address = process.env.Address as Address;

      const nonce = await web3.eth.getTransactionCount(address, "latest");

      console.log(nonce);

      const txs: string[] = [];

      for (let i = 0; i < 3; i++) {
        const tx: Transaction = {
          from: address,
          to: address,
          value: web3.utils.toWei(0.0001, "ether"),
          gas: 0x17530,
          gasPrice: 0x12a05f200,
          nonce: nonce + BigInt(i + 1),
        };
        const signedTx = await web3.eth.accounts
          .signTransaction(tx, privateKey)
          .catch((reason: any) => {
            console.error(reason);
            fail();
          });
        txs.push(signedTx.rawTransaction);
      }

      const bundle: SendBundleArg = {
        txs: txs,
        maxBlockNumber: 0,
      };

      console.info("bundle arg: ", bundle);
      const bundleHash_ = await web3.bundle
        .sendBundle(web3.requestManager, bundle)
        .catch((reason: any) => {
          console.error(reason);
          fail();
        });
      console.info("bundleHash: ", bundleHash_);
      bundleHash = bundleHash_;
    });

    it("test bundle api eth_queryBundle", async () => {
      const bundle = await web3.bundle
        .queryBundle(web3.requestManager, bundleHash)
        .catch((reason: any) => {
          console.error(reason);
          fail();
        });
      console.info("bundle: ", bundle);
    });

    it("test bundle api eth_bundlePrice", async () => {
      const bundlePrice = await web3.bundle
        .bundlePrice(web3.requestManager)
        .catch((reason: any) => {
          console.error(reason);
          fail();
        });
      console.info("bundlePrice", bundlePrice);
    });

    it("test bundle api eth_builders", async () => {
      const builders = await web3.bundle
        .builders(web3.requestManager)
        .catch((reason: any) => {
          console.error(reason);
          fail();
        });
      console.info("builders: ", builders);
    });

    it("test bundle api eth_validators", async () => {
      const validators = await web3.bundle
        .builders(web3.requestManager)
        .catch((reason: any) => {
          console.error(reason);
          fail();
        });
      console.info("validators: ", validators);
    });
  });
});
