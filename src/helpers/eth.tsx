import { ethers } from "ethers";
import { formatEther, parseEther } from "ethers/lib/utils";
import { pools, otherPools, tokens } from "../misc/contracts";
import { Pool, Token } from "../types";
import coingecko from "./coingecko";

export async function getERC20balance(
  address: string,
  token: Token,
  provider: any
) {
  const contract = new ethers.Contract(token.address, token.abi, provider);
  const amount = await contract.balanceOf(address);
  return parseFloat(formatEther(amount)).toFixed(4);
}

export async function getCurrentTotalStake(pool: Pool, provider) {
  const contract = new ethers.Contract(pool.address, pool.abi, provider);
  const totalSupply = await contract.totalSupply();
  return parseFloat(formatEther(totalSupply));
}

export async function stake(pool, signer, amount) {
  const contract = new ethers.Contract(pool.address, pool.abi, signer);
  await contract.stake(parseEther(amount));
}

export async function claim(pool, signer) {
  const contract = new ethers.Contract(pool.address, pool.abi, signer);
  await contract.getReward();
}

export async function exit(pool, signer) {
  const contract = new ethers.Contract(pool.address, pool.abi, signer);
  await contract.exit();
}

export async function getStakedBalance(address: string, pool: Pool, provider) {
  const contract = new ethers.Contract(pool.address, pool.abi, provider);
  const balance = await contract.balanceOf(address);
  return parseFloat(formatEther(balance));
}

export async function checkAllowance(address: string, pool: Pool, provider) {
  const contract = new ethers.Contract(
    pool.token.address,
    pool.token.abi,
    provider
  );

  const allowance = await contract.allowance(address, pool.address);
  const dec = formatEther(allowance);
  return parseFloat(dec) > 0;
}

export async function getAllowance(address, pool: Pool, signer) {
  const contract = new ethers.Contract(
    pool.token.address,
    pool.token.abi,
    signer
  );
  let wei = ethers.utils.parseEther("999999999");
  await contract.approve(pool.address, wei);
}

export async function getRewardsAvailable(address, pool: Pool, provider) {
  const contract = new ethers.Contract(pool.address, pool.abi, provider);
  const balance = await contract.earned(address);
  return parseFloat(formatEther(balance));
}

export async function getYieldsFor(
  poolName: string,
  account: string,
  provider
) {
  let yieldResults: any = null;

  switch (poolName) {
    case "ZZZ": {
      yieldResults = await uniYield(pools[1], account, provider);
      break;
    }
    case "BPT": {
      yieldResults = await BPTYield(pools[0], account, provider);
      break;
    }
  }

  return yieldResults;
}

async function uniYield(
  pool: Pool,
  account: string,
  provider
): Promise<{ weeklyROI: string; yearlyROI: string }> {
  const POOL_B = new ethers.Contract(pool.address, pool.abi, provider);
  const ZZZ_TOKEN = new ethers.Contract(
    tokens.ZZZ.address,
    tokens.ZZZ.abi,
    provider
  );

  const ZZZ_ETH_UNI_POOL = new ethers.Contract(
    tokens.ZZZETHUNI.address,
    tokens.ZZZETHUNI.abi,
    provider
  );
  const WETH_TOKEN = new ethers.Contract(
    tokens.WETH.address,
    tokens.WETH.abi,
    provider
  );

  const totalWethInUNI =
    (await WETH_TOKEN.balanceOf(tokens.ZZZETHUNI.address)) / 1e18;

  const totalUniSupply = (await ZZZ_ETH_UNI_POOL.totalSupply()) / 1e18;

  const prices = await coingecko.getPricingFor(tokens.WETH.address, "USD");

  const ethPrice = prices.usd;
  const totalPoolValue = totalWethInUNI * ethPrice * 2;
  const UNIPrice = totalPoolValue / totalUniSupply;

  // const stakedZZZAmount = (await POOL_B.balanceOf(account)) / 1e18;
  // const earnedUNI = (await POOL_B.earned(account)) / 1e18;
  const totalStakedZZZ = (await ZZZ_TOKEN.balanceOf(POOL_B.address)) / 1e18;

  const weeklyReward = await getUniPoolWeeklyRewards(POOL_B);

  const rewardPerToken = weeklyReward / totalStakedZZZ;

  const ZZZPrice = await coingecko.getPricingFor(ZZZ_TOKEN.address, "USD");

  const weeklyROI = ((rewardPerToken * UNIPrice * 100) / ZZZPrice.usd).toFixed(
    2
  );

  return {
    weeklyROI,
    yearlyROI: (parseFloat(weeklyROI) * 52).toFixed(2)
  };
}

async function getUniPoolWeeklyRewards(contract) {
  const now = Date.now() / 1000;
  const periodFinish = await contract.periodFinish();

  if (periodFinish < now) {
    return 0;
  }
  const rewardRate = await contract.rewardRate();
  return Math.round((rewardRate / 1e18) * 604800);
}

async function BPTYield(pool: Pool, account: string, provider) {
  const POOL_A = new ethers.Contract(pool.address, pool.abi, provider);
  const ZZZ_TOKEN = new ethers.Contract(
    tokens.ZZZ.address,
    tokens.ZZZ.abi,
    provider
  );

  // const stakedYAmount = (await POOL_A.balanceOf(account)) / 1e18;
  // const earnedYFI = (await POOL_A.earned(account)) / 1e18;
  const totalStakedYAmount = (await ZZZ_TOKEN.balanceOf(pool.address)) / 1e18;

  // BPT
  const ZZZ_DAI_BALANCER_POOL = new ethers.Contract(
    otherPools[0].address,
    otherPools[0].abi,
    provider
  );
  // const ZZZ_DAI_BPT_TOKEN_CONTRACT = new ethers.Contract(
  //   otherPools[0].address,
  //   tokens.ZZZ.abi,
  //   provider
  // );
  // const BPT_STAKING_POOL = new ethers.Contract(
  //   pool.address,
  //   require("../misc/abi/mstable_pool_abi.json"),
  //   provider
  // );
  const totalBPTAmount = (await ZZZ_DAI_BALANCER_POOL.totalSupply()) / 1e18;
  // const totalStakedBPTAmount =
  //   (await ZZZ_DAI_BPT_TOKEN_CONTRACT.balanceOf(pool.address)) / 1e18;
  // const yourBPTAmount = (await BPT_STAKING_POOL.balanceOf(account)) / 1e18;

  const totalDAIAmount =
    (await ZZZ_DAI_BALANCER_POOL.getBalance(tokens.DAI.address)) / 1e18;
  const totalZZZAmount =
    (await ZZZ_DAI_BALANCER_POOL.getBalance(tokens.ZZZ.address)) / 1e18;

  const DAIPerBPT = totalDAIAmount / totalBPTAmount;
  const ZZZPerBPT = totalZZZAmount / totalBPTAmount;
  // Find out reward rate
  const weekly_reward = await getUniPoolWeeklyRewards(POOL_A);

  const rewardPerToken = weekly_reward / totalStakedYAmount;
  // Find out underlying assets of Y
  // const ZZZPrice = await CURVE_Y_POOL.get_virtual_price() / 1e18;

  // Look up prices
  // const prices = await lookUpPrices(["yearn-finance"]);
  // const YFIPrice = prices["yearn-finance"].usd;
  const DAIPrice = await coingecko.getPricingFor(tokens.DAI.address, "USD");
  // const BPTPrice = (await YFI_DAI_BALANCER_POOL.getSpotPrice(DAI_TOKEN_ADDR,YFII_TOKEN_ADDR) / 1e18) * DAIPrice;
  const ZZZPrice = await coingecko.getPricingFor(ZZZ_TOKEN.address, "USD");
  const BPTPrice = DAIPerBPT * DAIPrice.usd + ZZZPerBPT * ZZZPrice.usd;

  const weeklyROI = (rewardPerToken * BPTPrice * 100) / ZZZPrice.usd;

  return {
    weeklyROI: weeklyROI.toFixed(2),
    yearlyROI: (weeklyROI * 52).toFixed(2)
  };
}

export async function getBPTPrice(provider) {
  const ZZZ_DAI_BALANCER_POOL = new ethers.Contract(
    otherPools[0].address,
    otherPools[0].abi,
    provider
  );
  const totalBPTAmount = (await ZZZ_DAI_BALANCER_POOL.totalSupply()) / 1e18;
  const totalDAIAmount =
    (await ZZZ_DAI_BALANCER_POOL.getBalance(tokens.DAI.address)) / 1e18;
  const totalZZZAmount =
    (await ZZZ_DAI_BALANCER_POOL.getBalance(tokens.ZZZ.address)) / 1e18;
  const ZZZPerBPT = totalZZZAmount / totalBPTAmount;
  const ZZZPrice = await coingecko.getPricingFor(tokens.ZZZ.address, "USD");
  const DAIPerBPT = totalDAIAmount / totalBPTAmount;
  const DAIPrice = await coingecko.getPricingFor(tokens.DAI.address, "USD");
  const BPTPrice = DAIPerBPT * DAIPrice.usd + ZZZPerBPT * ZZZPrice.usd;

  return BPTPrice.toFixed(2);
}

// _getERC20Balance = async (web3, asset, account, callback) => {
//   let erc20Contract = new web3.eth.Contract(config.erc20ABI, asset.address)

//   try {
//     var balance = await erc20Contract.methods.balanceOf(account.address).call({ from: account.address });
//     balance = parseFloat(balance)/10**asset.decimals
//     callback(null, parseFloat(balance))
//   } catch(ex) {
//     return callback(ex)
//   }
// }

// _getstakedBalance = async (web3, asset, account, callback) => {
//   let erc20Contract = new web3.eth.Contract(asset.rewardsABI, asset.rewardsAddress)

//   try {
//     var balance = await erc20Contract.methods.balanceOf(account.address).call({ from: account.address });
//     balance = parseFloat(balance)/10**asset.decimals
//     callback(null, parseFloat(balance))
//   } catch(ex) {
//     return callback(ex)
//   }
// }

// _getRewardsAvailable = async (web3, asset, account, callback) => {
//   let erc20Contract = new web3.eth.Contract(asset.rewardsABI, asset.rewardsAddress)

//   try {
//     var earned = await erc20Contract.methods.earned(account.address).call({ from: account.address });
//     earned = parseFloat(earned)/10**asset.decimals
//     callback(null, parseFloat(earned))
//   } catch(ex) {
//     return callback(ex)
//   }
// }

// _checkIfApprovalIsNeeded = async (asset, account, amount, contract, callback, overwriteAddress) => {
//   const web3 = new Web3(store.getStore('web3context').library.provider);
//   let erc20Contract = new web3.eth.Contract(config.erc20ABI, (overwriteAddress ? overwriteAddress : asset.address))
//   const allowance = await erc20Contract.methods.allowance(account.address, contract).call({ from: account.address })

//   const ethAllowance = web3.utils.fromWei(allowance, "ether")
//   if(parseFloat(ethAllowance) < parseFloat(amount)) {
//     asset.amount = amount
//     callback(null, asset)
//   } else {
//     callback(null, false)
//   }
// }

// _callApproval = async (asset, account, amount, contract, last, callback, overwriteAddress) => {
//   const web3 = new Web3(store.getStore('web3context').library.provider);
//   let erc20Contract = new web3.eth.Contract(config.erc20ABI, (overwriteAddress ? overwriteAddress : asset.address))
//   try {
//     if(last) {
//       await erc20Contract.methods.approve(contract, web3.utils.toWei("999999999999999", "ether")).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
//       callback()
//     } else {
//       erc20Contract.methods.approve(contract, web3.utils.toWei("999999999999999", "ether")).send({ from: account.address, gasPrice: web3.utils.toWei(await this._getGasPrice(), 'gwei') })
//         .on('transactionHash', function(hash){
//           callback()
//         })
//         .on('error', function(error) {
//           if (!error.toString().includes("-32601")) {
//             if(error.message) {
//               return callback(error.message)
//             }
//             callback(error)
//           }
//         })
//     }
//   } catch(error) {
//     if(error.message) {
//       return callback(error.message)
//     }
//     callback(error)
//   }
// }

// stake = (payload) => {
//   const account = store.getStore('account')
//   const { asset, amount } = payload.content

//   this._checkApproval(asset, account, amount, asset.rewardsAddress, (err) => {
//     if(err) {
//       return emitter.emit(ERROR, err);
//     }

//     this._callStake(asset, account, amount, (err, res) => {
//       if(err) {
//         return emitter.emit(ERROR, err);
//       }

//       return emitter.emit(STAKE_RETURNED, res)
//     })
//   })
// }
