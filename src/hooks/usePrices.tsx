import { useState, useEffect } from "react";
import coingecko from "../helpers/coingecko";
import { tokens } from "../misc/contracts";

export function usePrices(token: string) {
  const [currentPrice, setCurrentPrice] = useState<any>("checking price");
  const address = tokens[token].address;

  useEffect(() => {
    coingecko.getPricingFor(address, "USD").then(res => setCurrentPrice(res));
  }, [address]);

  return currentPrice;
}
