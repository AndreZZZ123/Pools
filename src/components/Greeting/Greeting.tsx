import React, { useEffect, useState } from "react";
import ZZZlogo1 from "../../assets/zzz_default_logo.png";
import { tokens } from "../../misc/contracts";
import coingecko from "../../helpers/coingecko";
import "./Greeting.scss";

function Greeting({ setCurrentTheme, currentTheme, ...rest }) {
  const [currentPrice, setCurrentPrice] = useState<any>("checking price");
  useEffect(() => {
    coingecko
      .getPricingFor(tokens.ZZZ.address, "USD")
      .then(res => setCurrentPrice(res));
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
      <h3>Sleep. Earn.</h3>
      <h2 className="greeting-current-price">1 ZZZ = ${currentPrice.usd}</h2>
    </div>
  );
}

export default Greeting;
