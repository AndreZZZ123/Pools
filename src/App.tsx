import { useWeb3React } from "@web3-react/core";
import React, { useState, useEffect } from "react";
import { observer } from "mobx-react";
import { useEagerConnect, useInactiveListener } from "./misc/hooks";
import Greeting from "./components/Greeting/Greeting";
import Connectors from "./components/Connectors/Connectors";
import Products from "./components/Products/Products";
import Menu from "./components/Menu/Menu";
import Footer from "./components/Footer/Footer";
import MenuIcon from "./components/SVG/MenuIcon";
import Button from "./components/Button/Button";
import Prices from "./stores/prices";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import "./App.scss";

function App() {
  const theme = localStorage.getItem("zzz-finance-theme");
  const { account, active, library } = useWeb3React();
  const [currentTheme, setCurrentThemeLocal] = useState(theme || "other");
  const [showWallet, setShowWallet] = useState(true);

  function setCurrentTheme(theme: any) {
    setCurrentThemeLocal(theme);
    localStorage.setItem("zzz-finance-theme", theme);
  }

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager);

  useEffect(() => {
    if (account && library) {
      Prices.fetchPrices(library);
      Prices.fetchBalances(account, library);
    }
  }, [account, library]);

  return (
    <div id="app-root">
      <div className={`theme-${currentTheme}`}>
        <div className="app-container">
          {active && (
            <MenuIcon setShowWallet={setShowWallet} showWallet={showWallet} />
          )}
          {account && showWallet && (
            <Menu
              showWallet={showWallet}
              setShowWallet={setShowWallet}
              setCurrentTheme={setCurrentTheme}
              currentTheme={currentTheme}
            />
          )}
          <div className="content">
            {!account ? (
              <Greeting
                currentTheme={currentTheme}
                setCurrentTheme={setCurrentTheme}
                active={active}
              />
            ) : (
              <Products />
            )}

            {!active && (
              <div className="entry-container">
                <a
                  href="https://beta.uniswap.info/pair/0x7d829fcc84f9dca5a3e6d9fb73545bacf350146a"
                  rel="noopener noreferrer"
                  target="_blank"
                  style={{ display: "block" }}
                >
                  <Button className="uniswap-button-menu">
                    <span
                      role="img"
                      aria-label="sleepy"
                      style={{ fontSize: "24px", marginRight: "5px" }}
                    >
                      💤
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
                      😴
                    </span>
                    GET NAP
                  </Button>
                </a>
                <Connectors />
              </div>
            )}
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default observer(App);
