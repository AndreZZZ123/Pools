import React, { useEffect, useState } from "react";
import ZZZlogo1 from "../../assets/zzz_logo_transparent.png";
import { tokens } from "../../misc/contracts";
import coingecko from "../../helpers/coingecko";
import Button from "../Button/Button";
import telegramicon from "../../assets/telegram_logo.webp";
import forumsicon from "../../assets/forums_logo.png";
import "./Greeting.scss";
import Spinner from "../Spinner/Spinner";

function Greeting({ setCurrentTheme, currentTheme, ...rest }) {
  const [currentPrice, setCurrentPrice] = useState<any>(undefined);
  useEffect(() => {
    coingecko
      .getPricingFor(tokens.ZZZ.address, "USD")
      .then(res => setCurrentPrice(res));
  }, []);
  return (
    <div className="greeting">
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
      <div className="header">
        <a
          href="https://t.me/ZZZfinance/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="button-header" icon={telegramicon}>
            Telegram
          </Button>
        </a>
        <a
          href="https://forums.zzz.finance/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button className="button-header" icon={forumsicon}>
            Forums
          </Button>
        </a>
      </div>
      <img src={ZZZlogo1} alt="ZZZ" className="zzz-logo" />

      <h1 className="title">ZZZ.finance</h1>
      <h3>Sleep. Earn. Smile.</h3>
      <Spinner condition={!!currentPrice}>
        <h2 className="greeting-current-price">
          1 ZZZ = ${currentPrice && currentPrice.usd}
        </h2>
      </Spinner>
    </div>
  );
}

export default Greeting;
