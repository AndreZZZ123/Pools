import { useWeb3React } from "@web3-react/core";
import React, { useState } from "react";
import Greeting from "./components/Greeting/Greeting";
import Connectors from "./components/Connectors/Connectors";
import Products from "./components/Products/Products";
import Menu from "./components/Menu/Menu";
import Footer from "./components/Footer/Footer";
import MenuIcon from "./components/SVG/MenuIcon";
import Modal from "react-modal";
import Button from "./components/Button/Button";
import uniswapicon from "./assets/uniswap_corn1.svg";

import "./App.scss";
import { useEagerConnect, useInactiveListener } from "./misc/hooks";

import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

Modal.setAppElement("#root");

function App() {
  const { account, active } = useWeb3React();
  const [currentTheme, setCurrentTheme] = useState("other");
  const [showWallet, setShowWallet] = useState(true);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager);

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
                  style={{ display: "block", minWidth: "12em" }}
                >
                  <Button className="uniswap-button" icon={uniswapicon}>
                    UNISWAP
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

export default App;
