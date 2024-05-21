export const queryBundleSchema = {
  type: "object",
  properties: {
    hash: {
      format: "string",
    },
    txs: {
      type: "string",
      items: {
        format: "string",
      },
    },
    maxBlockNumber: {
      format: "numbers",
    },
    status: {
      format: "numbers",
    },
    gasFee: {
      format: "numbers",
    },
    builder: {
      format: "string",
    },
    confirmedBlockNumber: {
      format: "numbers",
    },
    confirmedDate: {
      format: "numbers",
    },
  },
};

export const sendBundleArgSchema = {
  txs: {
    type: "string",
    items: {
      format: "string",
    },
  },
  maxBlockNumber: {
    format: "numbers",
  },
  minTimestamp: {
    format: "numbers",
  },
  maxTimestamp: {
    format: "numbers",
  },
  revertingTxHashes: {
    type: "string",
    items: {
      format: "string",
    },
  },
};
