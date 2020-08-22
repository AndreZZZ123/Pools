import React from "react";
import { useWeb3React } from "@web3-react/core";
import Button from "../Button/Button";
import WalletList from "../WalletList/WalletList";
import Spinner from "../Spinner/Spinner";
import PriceStore from "../../stores/prices";
import { observer } from "mobx-react";
import ListedTokens from "./ListedTokens";
import "./Wallet.scss";

type Props = {
  setShowWallet: Function;
};

function Wallet({ setShowWallet }: Props) {
  const { account, deactivate } = useWeb3React();
  const prices = PriceStore.prices;
  const balances = PriceStore.balances;

  return (
    <div className="wallet">
      <WalletList>
        <WalletList.Account>
          {account && (
            <div className="account-connected">
              <div>
                <span role="img" aria-label="connected">
                  ✅
                </span>
              </div>
              <div className="account-address">
                {account.substring(0, 6)}...
                {account.substring(account.length - 4)}
              </div>
            </div>
          )}
        </WalletList.Account>
        {ListedTokens.map(
          ({ name, icon }) =>
            balances.get(name) && (
              <WalletList.Currency key={`wallet-currency-${name}`}>
                <div className="currency-with-icon">
                  {icon ? (
                    <img
                      src={icon}
                      className="wallet-balance-icon"
                      alt={name}
                    />
                  ) : (
                    <div className="wallet-balance-icon-unidentified"></div>
                  )}
                  {balances.get(name)}
                </div>
                <Spinner
                  width={20}
                  height={20}
                  type="ThreeDots"
                  condition={prices.get(name) || name === "NAPS"}
                >
                  <div className="currency-usd-value">
                    {name !== "NAPS" ? (
                      <span>1 = {prices.get(name)}</span>
                    ) : (
                      <span>NAPS</span>
                    )}
                  </div>
                </Spinner>
              </WalletList.Currency>
            )
        )}
      </WalletList>
      <div className="menu-buttons">
        <a
          href="https://beta.uniswap.info/pair/0x7d829fcc84f9dca5a3e6d9fb73545bacf350146a"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Button className=" uniswap-button-menu">
            <span
              role="img"
              aria-label="sleepy"
              style={{ fontSize: "24px", marginRight: "5px" }}
            >
              🦄
            </span>
            GET ZZZ
          </Button>
        </a>
        <a
          href="https://beta.uniswap.info/pair/0x0de0322d3ac0d5002e2bc9c3a188728728d90799"
          rel="noopener noreferrer"
          target="_blank"
        >
          <Button className="uniswap-button-menu">
            {" "}
            <span
              role="img"
              aria-label="sleepy"
              style={{ fontSize: "24px", marginRight: "5px" }}
            >
              🦄
            </span>
            GET NAP
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
