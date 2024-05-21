import { Web3PluginBase, Web3RequestManager } from "web3-core";
import { QueryBundle, SendBundleArg } from "./types";

export class Web3BundlePlugin extends Web3PluginBase {
  public pluginNamespace = "bundle";

  public async sendBundle(
    requestManager: Web3RequestManager,
    arg: SendBundleArg
  ): Promise<string> {
    return requestManager.send({
      method: "eth_sendBundle",
      params: [arg],
    });
  }

  public async queryBundle(
    requestManager: Web3RequestManager,
    bundleHash: string
  ): Promise<QueryBundle> {
    return requestManager.send({
      method: "eth_queryBundle",
      params: [bundleHash],
    });
  }

  public async bundlePrice(
    requestManager: Web3RequestManager
  ): Promise<bigint> {
    return requestManager.send({
      method: "eth_bundlePrice",
    });
  }

  public async builders(requestManager: Web3RequestManager): Promise<string[]> {
    return requestManager.send({
      method: "eth_builders",
    });
  }

  public async validators(
    requestManager: Web3RequestManager
  ): Promise<string[]> {
    return requestManager.send({
      method: "eth_validators",
    });
  }
}

declare module "web3" {
  interface Web3Context {
    bundle: Web3BundlePlugin;
  }
}
