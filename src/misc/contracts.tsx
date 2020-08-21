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
    name: "ZZZETHUNI",
    address: "0x7d829fcc84f9dca5a3e6d9fb73545bacf350146a",
    abi: require("./abi/erc20_abi.json")
  },
  WETH: {
    name: "WETH",
    address: "0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2",
    abi: require("./abi/erc20_abi.json")
  },
  DAI: {
    name: "DAI",
    address: "0x6B175474E89094C44Da98b954EedeAC495271d0F",
    abi: require("./abi/erc20_abi.json")
  }
};

export const pools: Pool[] = [
  {
    name: "BPT",
    address: "0x2d0b69300c4637625681a19d840e8e9c1ebe4126",
    token: tokens.BPT,
    reward: tokens.ZZZ,
    poolIcon: "🌱",
    abi: require("./abi/zzz_bpt_pool_abi.json"),
    info: "Stake your BPT for ZZZ token reward.",
    buyAssetFrom:
      "https://pools.balancer.exchange/#/pool/0x4f9dde745bf54f207dfc1fe34896d6752c63ad07/"
  },
  {
    name: "ZZZ",
    address: "0xeEE0B2ED62615441CE31c3166a4179a4B8FcE615",
    token: tokens.ZZZ,
    reward: tokens.ZZZETHUNI,
    poolIcon: "😴",
    abi: require("./abi/zzz_uni_pool_abi.json"),
    info: "Stake your ZZZ for ZZZ/ETH UNI LP v2 token reward.",
    buyAssetFrom:
      "https://beta.uniswap.info/pair/0x7d829fcc84f9dca5a3e6d9fb73545bacf350146a"
  }
];

export const otherPools = [
  {
    name: "Balancer Pool",
    skipRender: false,
    address: "0x4f9dde745bf54f207dfc1fe34896d6752c63ad07",
    abi: require("./abi/balancer_pool_abi.json")
  }
];
