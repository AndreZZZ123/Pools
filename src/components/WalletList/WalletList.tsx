import React from "react";
import "./WalletList.scss";

function WalletList({ children }) {
  return <div className="wallet-list">{children}</div>;
}

WalletList.Currency = ({ children }) => (
  <h3 className="wallet-list wallet-list-currency">{children}</h3>
);

WalletList.Account = ({ children }) => (
  <div className="wallet-list wallet-list-account">{children}</div>
);

export default WalletList;
