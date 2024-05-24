import { Web3PluginBase } from "web3";
import { QueryBundle, SendBundleArg } from "./types";

type BundleRpcApi = {
  eth_sendBundle: (parameter1: SendBundleArg) => string;
  eth_queryBundle: (parameter1: string) => QueryBundle;
  eth_bundlePrice: () => bigint;
  eth_validators: () => string[];
  eth_builders: () => string[];
};

export class Web3BundlePlugin extends Web3PluginBase<BundleRpcApi> {
  public pluginNamespace = "bundle";

  public async sendBundle(arg: SendBundleArg): Promise<string> {
    return this.requestManager.send({
      method: "eth_sendBundle",
      params: [arg],
    });
  }

  public async queryBundle(bundleHash: string): Promise<QueryBundle> {
    return this.requestManager.send({
      method: "eth_queryBundle",
      params: [bundleHash],
    });
  }

  public async bundlePrice(): Promise<bigint> {
    return this.requestManager.send({
      method: "eth_bundlePrice",
    });
  }

  public async builders(): Promise<string[]> {
    return this.requestManager.send({
      method: "eth_builders",
    });
  }

  public async validators(): Promise<string[]> {
    return this.requestManager.send({
      method: "eth_validators",
    });
  }
}

declare module "web3" {
  interface Web3Context {
    bundle: Web3BundlePlugin;
  }
}
