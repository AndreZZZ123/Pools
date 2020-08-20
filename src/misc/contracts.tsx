import { Pool, Token } from "../types";

export const tokens: { [tokenName: string]: Token } = {
  ZZZ: {
    name: "ZZZ",
    address: "0xc75F15AdA581219c95485c578E124df3985e4CE0",
    abi: require("./abi/erc20_abi.json")
  },
  BPT: {
    name: "BPT",
    address: "0x4f9dde745bf54f207dfc1fe34896d6752c63ad07",
    abi: require("./abi/erc20_abi.json")
  },
  ZZZETHUNI: {
    name: "ZZZ/ETH UNI LP",
    address: "0x7d829fcc84f9dca5a3e6d9fb73545bacf350146a",
    abi: require("./abi/uniswap_lp_abi.json")
  },
  WETH: {
    name: "WETH",
    address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    abi: require("./abi/erc20_abi.json")
  }
};

export const devTokens: { [tokenName: string]: Token } = {
  ZZZ: {
    name: "ZZZ",
    address: "0x9f5d2da0d3cf4c710dc3efe6e3a790fc363a4ec8",
    abi: require("./abi/erc20_abi.json")
  },
  BPT: {
    name: "BPT",
    address: "0x4f9dde745bf54f207dfc1fe34896d6752c63ad07",
    abi: require("./abi/erc20_abi.json")
  },
  ZZZETHUNI: {
    name: "UNI",
    address: "0xf63cF54f83932bf900838F8C4eb4A2DB6Dc23c96",
    abi: require("./abi/erc20_abi.json")
  },
  WETH: {
    name: "WETH",
    address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    abi: require("./abi/erc20_abi.json")
  }
};

export const pools: Pool[] = [
  // {
  //   name: "Balancer",
  //   address: "0x2d0b69300c4637625681a19d840e8e9c1ebe4126",
  //   token: tokens.BPT,
  //   reward: tokens.ZZZ,
  //   poolIcon: "🌱",
  //   abi: require("./abi/zzz_ bpt_pool_abi.json"),
  //   info: "Stake your BPT for ZZZ token reward."
  // },
  // {
  //   name: "ZZZ",
  //   address: "0xeEE0B2ED62615441CE31c3166a4179a4B8FcE615",
  //   token: tokens.ZZZ,
  //   reward: tokens.ZZZETHUNI,
  //   poolIcon: "🌈",
  //   abi: require("./abi/zzz_uni_pool_abi.json"),
  //   info: "Stake your ZZZ for ZZZ/ETH UNI LP v2 token reward."
  // },
  {
    name: "Kovan 1",
    address: "0x6a544d7c5754a147f8ce742f73f34d1eb7612f53",
    token: devTokens.ZZZ,
    reward: devTokens.ZZZETHUNI,
    poolIcon: "🌱",
    abi: require("./abi/zzz_bpt_pool_abi.json"),
    info: "Stake."
  },
  {
    name: "Kovan 2",
    address: "0x844eec2d28e98fc037eb080530e3b68bf2ebe0b7",
    token: devTokens.ZZZETHUNI,
    reward: devTokens.ZZZETHUNI,
    poolIcon: "🌈",
    abi: require("./abi/zzz_uni_pool_abi.json"),
    info: "Just do it."
  }
];

export const poolsDev: Pool[] = [];

export const BalancerPool = "0x4f9dde745bf54f207dfc1fe34896d6752c63ad07";
