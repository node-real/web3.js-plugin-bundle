import { Web3, core } from "web3";
import { SendBundleArg, Web3BundlePlugin } from "../src";

const endpointUrl =
  "https://bsc-testnet.nodereal.io/v1/{{apikey}}";

describe("Web3BundlePlugin Tests", () => {
  it("should register Web3BundlePlugin plugin on Web3Context instance", () => {
    const web3Context = new core.Web3Context(endpointUrl);
    web3Context.registerPlugin(new Web3BundlePlugin());
    expect(web3Context.bundle).toBeDefined();
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
      const bundle: SendBundleArg = {
        txs: [
          "0xf86b820e0785012a05f200827530948e15d16d6432166372fb1e6f4a41840d71edd41f8401c9c3808081e6a0afeadce597f61cbd55f0a0f14351497763246ebcc3d0ef387da4cd4b16e2cc5ca0760e03f1ad3c1b30ec9cba24c3cef0c01996c1152d224c0bd242b1a73d2b54a0",
        ],
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
