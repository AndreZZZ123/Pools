import { useWeb3React } from "@web3-react/core";
import React, { useEffect } from "react";
import { injected, walletconnect } from "../../misc/connectors";
import MetaMask from "../../assets/metamask_icon.svg";
import Button from "../Button/Button";
import "./Connectors.scss";

enum ConnectorNames {
  Injected = "Browser wallet",
  // Network = "Network",
  WalletConnect = "Mobile wallet"
  // WalletLink = "WalletLink"
  // Ledger = "Ledger"
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
  [ConnectorNames.WalletConnect]: walletconnect
  // [ConnectorNames.WalletLink]: walletlink
  // [ConnectorNames.Ledger]: ledger
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

  if (!active) {
    return (
      <div className="connectors-container">
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
                {name !== "Mobile wallet" && (
                  <img
                    src={MetaMask}
                    alt="MetaMask"
                    className="icon metamask-icon"
                  />
                )}
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
