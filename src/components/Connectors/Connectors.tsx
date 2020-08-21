import { useWeb3React } from "@web3-react/core";
import React, { useEffect } from "react";
import { injected, ledger } from "../../misc/connectors";
import MetaMask from "../../assets/metamask_icon.svg";
import { useEagerConnect, useInactiveListener } from "../../misc/hooks";
import Button from "../Button/Button";
import uniswapicon from "../../assets/uniswap_corn1.svg";

import "./Connectors.scss";

enum ConnectorNames {
  Injected = "Unlock wallet",
  // Network = "Network",
  // WalletConnect = "WalletConnect",
  // WalletLink = "WalletLink",
  Ledger = "Ledger"
  // Trezor = "Trezor",
  // Frame = "Frame",
  // Authereum = "Authereum",
  // Fortmatic = "Fortmatic",
  // Portis = "Portis",
  // Squarelink = "Squarelink",
  // Torus = "Torus",
}

const connectorsByName: { [connectorName in ConnectorNames]: any } = {
  [ConnectorNames.Injected]: injected,
  // [ConnectorNames.Network]: network,
  // [ConnectorNames.WalletConnect]: walletconnect,
  // [ConnectorNames.WalletLink]: walletlink,
  [ConnectorNames.Ledger]: ledger
  // [ConnectorNames.Trezor]: trezor,
  // [ConnectorNames.Frame]: frame,
  // [ConnectorNames.Authereum]: authereum,
  // [ConnectorNames.Fortmatic]: fortmatic,
  // [ConnectorNames.Portis]: portis,
  // [ConnectorNames.Squarelink]: squarelink,
  // [ConnectorNames.Torus]: torus
};

function Connectors() {
  const { connector, activate, active } = useWeb3React();

  // handle logic to recognize the connector currently being activated
  const [activatingConnector, setActivatingConnector] = React.useState<any>();

  useEffect(() => {
    if (activatingConnector && activatingConnector === connector) {
      setActivatingConnector(undefined);
    }
  }, [activatingConnector, connector]);

  // handle logic to eagerly connect to the injected ethereum provider, if it exists and has granted access already
  const triedEager = useEagerConnect();

  // handle logic to connect in reaction to certain events on the injected ethereum provider, if it exists
  useInactiveListener(!triedEager || !!activatingConnector);
  if (!active) {
    return (
      <div className="connectors-container">
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
        {Object.keys(connectorsByName).map(name => {
          const currentConnector = connectorsByName[name];
          // const activating = currentConnector === activatingConnector;
          // const connected = currentConnector === connector;
          // const disabled =
          //   !triedEager || !!activatingConnector || connected || !!error;

          return (
            <Button
              onClick={() => {
                setActivatingConnector(currentConnector);
                activate(connectorsByName[name]);
              }}
              key={name}
            >
              <div className="connector">
                {/* {connected && (
                  <span role="img" aria-label="check">
                    ✅
                  </span>
                )} */}
                <div>{name}</div>
                <img
                  src={MetaMask}
                  alt="MetaMask"
                  className="icon metamask-icon"
                />
              </div>
            </Button>
          );
        })}
      </div>
    );
  } else {
    return null;
  }
}

export default Connectors;
