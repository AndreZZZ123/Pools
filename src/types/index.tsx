export type Pool = {
  name: string;
  address: string;
  abi: string;
  poolIcon: string;
  token: Token;
  uiName: string;
  reward: Token;
  info: string;
  buyAssetFrom: string;
  boostAvailable?: boolean;
};

export type Token = {
  name: string;
  address: string;
  abi: string;
};
