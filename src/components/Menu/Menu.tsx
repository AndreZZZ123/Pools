import React, { useState } from "react";
import { useWeb3React } from "@web3-react/core";
import Wallet from "../Wallet/Wallet";
import "./Menu.scss";

type Props = {
  showWallet: boolean;
  setShowWallet: Function;
  setCurrentTheme: Function;
  currentTheme: string;
};

function Menu({
  showWallet,
  setShowWallet,
  setCurrentTheme,
  currentTheme,
}: Props) {
  const { connector, account, active } = useWeb3React();
  return (
    <div className="menu">
      {active && showWallet && (
        <Wallet
          setShowWallet={setShowWallet}
          setCurrentTheme={setCurrentTheme}
          currentTheme={currentTheme}
        />
      )}
    </div>
  );
}

export default Menu;
