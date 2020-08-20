import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { formatEther } from "ethers/lib/utils";
import { tokens } from "../../misc/contracts";
import Infobox from "../Infobox/Infobox";
import Button from "../Button/Button";
import uniswapicon from "../../assets/uniswap_corn1.svg";
import zzztokenicon from "../../assets/zzz_token_logo.png";
import ethicon from "../../assets/eth_icon.png";
import { getERC20balance } from "../../helpers/eth";
import "./Wallet.scss";

type Props = {
  setShowWallet: Function;
  setCurrentTheme: Function;
  currentTheme: string;
};

function Wallet({ setShowWallet, setCurrentTheme, currentTheme }: Props) {
  const { account, library, chainId, deactivate } = useWeb3React();

  const [balance, setBalance] = useState(0);
  const [ZZZBalance, setZZZBalance] = useState<any>(0);
  const [BPTBalance, setBPTBalance] = useState<any>(0);

  useEffect((): any => {
    if (!!account && !!library) {
      getERC20balance(account, tokens.ZZZ, library).then(res => {
        if (res) {
          setZZZBalance(res);
        }
      });

      getERC20balance(account, tokens.BPT, library).then(res => {
        if (res) {
          setBPTBalance(res);
        }
      });

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
      <Infobox>
        <Infobox.Title>
          {account === null
            ? "-"
            : account
            ? `✅ ${account.substring(0, 6)}...${account.substring(
                account.length - 4
              )}`
            : ""}
        </Infobox.Title>
        <Infobox.Title>
          <img src={ethicon} className="wallet-balance-icon" alt="ethereum" />
          {balance === null
            ? "Error"
            : balance
            ? `${parseFloat(formatEther(balance)).toFixed(4)}`
            : ""}
        </Infobox.Title>
        <Infobox.Title>
          <img
            src={zzztokenicon}
            className="wallet-balance-icon"
            alt="zzz token"
          />
          {ZZZBalance === null ? "Error" : balance ? ` ${ZZZBalance}` : ""}
        </Infobox.Title>
        <Infobox.Title>
          BPT
          {BPTBalance === null ? "Error" : balance ? ` ${BPTBalance}` : ""}
        </Infobox.Title>
      </Infobox>
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

export default Wallet;
