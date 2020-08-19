import { ethers } from "ethers";
import { formatEther } from "ethers/lib/utils";
import { Pool, Token } from "../types";

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
  let wei = ethers.utils.parseEther("9999999");
  const res = await contract.approve(pool.address, wei);
  console.log(res);
}

export async function getRewardsAvailable(address, pool: Pool, provider) {
  const contract = new ethers.Contract(pool.address, pool.abi, provider);
  const balance = await contract.earned(address);
  return parseFloat(formatEther(balance));
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
