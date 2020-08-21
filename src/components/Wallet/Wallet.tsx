import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { formatEther } from "ethers/lib/utils";
import { tokens } from "../../misc/contracts";
import Button from "../Button/Button";
import uniswapicon from "../../assets/uniswap_corn1.svg";
import uniswap_token_icon from "../../assets/uniswap_logo.png";
import zzztokenicon from "../../assets/zzz_token_logo.png";
import ethicon from "../../assets/eth_icon.png";
import bpticon from "../../assets/balancer_icon.webp";
import { getERC20balance } from "../../helpers/eth";
import "./Wallet.scss";
import WalletList from "../WalletList/WalletList";
import Spinner from "../Spinner/Spinner";
import PriceStore from "../../stores/prices";
import { observer } from "mobx-react";

type Props = {
  setShowWallet: Function;
  setCurrentTheme: Function;
  currentTheme: string;
};

function Wallet({ setShowWallet, setCurrentTheme, currentTheme }: Props) {
  const { account, library, chainId, deactivate } = useWeb3React();
  const prices = PriceStore.prices;

  const [balance, setBalance] = useState(0);
  const [ZZZBalance, setZZZBalance] = useState<any>(0);
  const [BPTBalance, setBPTBalance] = useState<any>(0);
  const [UNIBalance, setUNIbalance] = useState<any>(0);

  useEffect((): any => {
    if (!!account && !!library) {
      getERC20balance(account, tokens.ZZZ, library).then(setZZZBalance);
      getERC20balance(account, tokens.BPT, library).then(setBPTBalance);
      getERC20balance(account, tokens.ZZZETHUNI, library).then(setUNIbalance);

      let stale = false;
      library
        .getBalance(account)
        .then((balance: any) => {
          if (!stale) {
            setBalance(balance);
          }
        })
        .catch(() => {
          if (!stale) {
            setBalance(0);
          }
        });
      return () => {
        stale = true;
        setBalance(0);
        setZZZBalance(0);
        setBPTBalance(0);
      };
    }
  }, [account, library, chainId]); // ensures refresh if referential identity of library doesn't change across chainIds

  return (
    <div className="wallet">
      <WalletList>
        <WalletList.Account>
          {account === null
            ? "-"
            : account
            ? `✅ ${account.substring(0, 6)}...${account.substring(
                account.length - 4
              )}`
            : ""}
        </WalletList.Account>
        <WalletList.Currency>
          <div className="currency-with-icon">
            <img src={ethicon} className="wallet-balance-icon" alt="ethereum" />
            {balance ? `${parseFloat(formatEther(balance)).toFixed(4)}` : 0}
          </div>
          <Spinner
            width={20}
            height={20}
            type="ThreeDots"
            condition={prices.size}
          >
            <div className="currency-usd-value">1 = ${prices.get("WETH")}</div>
          </Spinner>
        </WalletList.Currency>
        <WalletList.Currency>
          <div className="currency-with-icon">
            <img
              src={zzztokenicon}
              className="wallet-balance-icon"
              alt="zzz token"
            />
            {ZZZBalance ? ZZZBalance : 0}
          </div>
          <Spinner
            width={20}
            height={20}
            type="ThreeDots"
            condition={prices.size}
          >
            <div className="currency-usd-value">1 = ${prices.get("ZZZ")}</div>
          </Spinner>
        </WalletList.Currency>
        <WalletList.Currency>
          <div className="currency-with-icon">
            <img
              src={uniswap_token_icon}
              className="wallet-balance-icon"
              alt="zzz token"
            />
            {UNIBalance ? UNIBalance : 0}
          </div>
          <Spinner
            width={20}
            height={20}
            type="ThreeDots"
            condition={prices.get("ZZZETHUNI")}
          >
            <div className="currency-usd-value">
              1 = ${prices.get("ZZZETHUNI")}
            </div>
          </Spinner>
        </WalletList.Currency>
        <WalletList.Currency>
          <div className="currency-with-icon">
            <img
              src={bpticon}
              className="wallet-balance-icon"
              alt="balancer pool token"
            />
            {BPTBalance ? BPTBalance : 0}
          </div>
          <Spinner
            width={20}
            height={20}
            type="ThreeDots"
            condition={prices.get("BPT")}
          >
            <div className="currency-usd-value">1 = ${prices.get("BPT")}</div>
          </Spinner>
        </WalletList.Currency>
      </WalletList>
      <div className="menu-buttons">
        <a
          href="https://beta.uniswap.info/pair/0x7d829fcc84f9dca5a3e6d9fb73545bacf350146a"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Button className="uniswap-button" icon={uniswapicon}>
            UNISWAP
          </Button>
        </a>
        <Button
          className="deactivate-button"
          onClick={() => {
            setShowWallet(true);
            deactivate();
          }}
        >
          Close wallet
        </Button>
      </div>
    </div>
  );
}

export default observer(Wallet);
