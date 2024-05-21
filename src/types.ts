import type { Bytes, Numbers } from "web3-types";

export type QueryBundle = {
  hash: Bytes;
  txs: Bytes[];
  maxBlockNumber: Numbers;
  status: Numbers;
  gasFee: Numbers;
  builder: Bytes;
  confirmedBlockNumber: Numbers;
  confirmedDate: Numbers;
};

export type SendBundleArg = {
  txs: Bytes[];
  maxBlockNumber?: Numbers;
  minTimestamp?: Numbers;
  maxTimestamp?: Numbers;
  revertingTxHashes?: Bytes[];
};
