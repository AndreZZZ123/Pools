import React, { useEffect, useState } from "react";
import ZZZlogo1 from "../../assets/zzz_default_logo.png";
import { tokens } from "../../misc/contracts";
import "./Greeting.scss";

function Greeting({ setCurrentTheme, currentTheme, ...rest }) {
  const [currentPrice, setCurrentPrice] = useState<any>("checking price");
  useEffect(() => {
    fetch(
      `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${tokens.ZZZ.address}&vs_currencies=usd`
    ).then((res) =>
      res.json().then((res) => {
        for (const [, value] of Object.entries(res)) {
          setCurrentPrice(value);
        }
      })
    );
  }, []);
  return (
    <div className="greeting">
      <img src={ZZZlogo1} alt="ZZZ" className="zzz-logo" />
      <div className="theme-toggler">
        <label className="switch">
          <input
            type="checkbox"
            onChange={() =>
              setCurrentTheme(currentTheme === "vapor" ? "other" : "vapor")
            }
          />
          <span className="slider round"></span>
        </label>
      </div>
      <h1 className="title">ZZZ.finance</h1>
      <h2>1 ZZZ = ${currentPrice.usd}</h2>
    </div>
  );
}

export default Greeting;
