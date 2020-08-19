import React, { useEffect, useState } from "react";
import { useWeb3React } from "@web3-react/core";
import { formatEther } from "ethers/lib/utils";
import { tokens } from "../../misc/contracts";
import Infobox from "../Infobox/Infobox";
import Button from "../Button/Button";
import uniswapicon from "../../assets/uniswap_corn1.svg";
import { getERC20balance } from "../../helpers/eth";
import "./Wallet.scss";

type Props = {
  setShowWallet: Function;
  setCurrentTheme: Function;
  currentTheme: string;
};

function Wallet({ setShowWallet, setCurrentTheme, currentTheme }: Props) {
  const { account, library, chainId, deactivate } = useWeb3React();

  const [balance, setBalance] = useState();
  const [ZZZBalance, setZZZBalance] = useState();
  const [BPTBalance, setBPTBalance] = useState();

  useEffect((): any => {
    if (!!account && !!library) {
      getERC20balance(account, tokens.ZZZ, library).then((res) => {
        if (res) {
          setZZZBalance(res);
        }
      });

      getERC20balance(account, tokens.BPT, library).then((res) => {
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
            setBalance(undefined);
          }
        });

      return () => {
        stale = true;
        setBalance(undefined);
        setZZZBalance(undefined);
        setBPTBalance(undefined);
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
            ? `${account.substring(0, 6)}...${account.substring(
                account.length - 4
              )}`
            : ""}
        </Infobox.Title>
        <Infobox.Title>
          ETH{" "}
          {balance === null
            ? "Error"
            : balance
            ? `${formatEther(balance || 0)}`
            : ""}
        </Infobox.Title>
        <Infobox.Title>
          ZZZ
          {ZZZBalance === null
            ? "Error"
            : balance
            ? ` ${formatEther(ZZZBalance || 0)}`
            : ""}
        </Infobox.Title>
        <Infobox.Title>
          BPT
          {BPTBalance === null
            ? "Error"
            : balance
            ? ` ${formatEther(BPTBalance || 0)}`
            : ""}
        </Infobox.Title>
      </Infobox>
      <div className="theme-toggler theme-toggler-menu">
        <label className="switch">
          <input
            type="checkbox"
            onChange={() =>
              setCurrentTheme(currentTheme === "vapor" ? "other" : "vapor")
            }
          />
          <span className="slider round"></span>
        </label>
      </div>
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
          setShowWallet(false);
          deactivate();
        }}
      >
        Close wallet
      </Button>
    </div>
  );
}

export default Wallet;
