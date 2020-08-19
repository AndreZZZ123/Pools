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
    abi: require("./abi/erc20_abi.json")
  }
};

export const pools: Pool[] = [
  {
    name: "Balancer Pool",
    address: "0x2d0b69300c4637625681a19d840e8e9c1ebe4126",
    token: tokens.BPT,
    reward: tokens.ZZZ,
    poolIcon: "🌱",
    abi: require("./abi/zzz_ bpt_pool_abi.json"),
    info: "Stake your BPT for ZZZ token reward."
  },
  {
    name: "ZZZ Pool",
    address: "0xeEE0B2ED62615441CE31c3166a4179a4B8FcE615",
    token: tokens.ZZZ,
    reward: tokens.ZZZETHUNI,
    poolIcon: "🌈",
    abi: require("./abi/zzz_uni_pool_abi.json"),
    info: "Stake your ZZZ for ZZZ/ETH UNI LP v2 token reward."
  }
];

export const BalancerPool = "0x4f9dde745bf54f207dfc1fe34896d6752c63ad07";
