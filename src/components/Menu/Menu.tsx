import React from "react";
import { useWeb3React } from "@web3-react/core";
import Wallet from "../Wallet/Wallet";
import "./Menu.scss";

type Props = {
  showWallet: boolean;
  setShowWallet: Function;
  setCurrentTheme: Function;
  currentTheme: string;
};

function Menu({ setShowWallet }: Props) {
  const { active } = useWeb3React();
  return (
    <div className="menu">
      {active && <Wallet setShowWallet={setShowWallet} />}
    </div>
  );
}

export default Menu;
