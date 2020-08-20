import { useWeb3React } from "@web3-react/core";
import React, { useState } from "react";
import Greeting from "./components/Greeting/Greeting";
import Connectors from "./components/Connectors/Connectors";
import Products from "./components/Products/Products";
import Menu from "./components/Menu/Menu";
import Footer from "./components/Footer/Footer";
import MenuIcon from "./components/SVG/MenuIcon";
import "./App.scss";

function App() {
  const { account, active } = useWeb3React();
  const [currentTheme, setCurrentTheme] = useState("vapor");
  const [showWallet, setShowWallet] = useState(true);

  return (
    <main id="app-root">
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
          <div className="content-with-sidebar">
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
              <Connectors />
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </main>
  );
}

export default App;
