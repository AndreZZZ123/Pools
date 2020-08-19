import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
// import Web3 from "web3";
import { ethers } from "ethers";
import { Web3ReactProvider } from "@web3-react/core";

function getWeb3Library(provider, connector) {
  const lib = new ethers.providers.Web3Provider(provider);
  lib.pollingInterval = 12000;
  return lib;
}

ReactDOM.render(
  <React.StrictMode>
    <Web3ReactProvider getLibrary={getWeb3Library}>
      <App />
    </Web3ReactProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
