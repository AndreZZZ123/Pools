export type Pool = {
  name: string;
  address: string;
  abi: string;
  poolIcon: string;
  token: Token;
  reward: Token;
  info: string;
  buyAssetFrom: string;
};

export type Token = {
  name: string;
  address: string;
  abi: string;
};
