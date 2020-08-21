import { observable, action } from "mobx";
import { tokens } from "../misc/contracts";
import coingecko from "../helpers/coingecko";
import { getUNIPrice, getBPTPrice, getERC20balance } from "../helpers/eth";
import { formatEther } from "ethers/lib/utils";

class Prices {
  @observable prices: Map<string, number> = new Map();
  @observable balances: Map<string, any> = new Map();

  @action fetchBalances(account, provider) {
    getERC20balance(account, tokens.ZZZ, provider).then(val => {
      let res = parseFloat(val).toFixed(4) || 0.0;
      this.balances.set("ZZZ", res);
    });
    getERC20balance(account, tokens.BPT, provider).then(val => {
      let res = parseFloat(val).toFixed(4) || 0.0;
      this.balances.set("BPT", res);
    });
    getERC20balance(account, tokens.ZZZETHUNI, provider).then(val => {
      let res = parseFloat(val).toFixed(4) || 0.0;
      this.balances.set("ZZZETHUNI", res);
    });
    getERC20balance(account, tokens.NAPS, provider).then(val => {
      let res = parseFloat(val).toFixed(4) || 0.0;
      this.balances.set("NAPS", res);
    });

    provider.getBalance(account).then((balance: any) => {
      const etherAmount = formatEther(balance);
      const number = parseFloat(etherAmount);
      this.balances.set("WETH", parseFloat(number.toFixed(4)));
    });
  }

  @action fetchPrices(provider) {
    const addresses: any[] = [];

    for (const [key, value] of Object.entries(tokens)) {
      addresses.push([key, value.address.toLowerCase()]);
    }

    const coinGeckoQuery = addresses.map(token => `${token[1]},`).join();
    coingecko
      .getPricingFor(coinGeckoQuery, "USD", true)
      .then((res: { value }) => {
        for (const [key, value] of Object.entries(res)) {
          addresses.forEach(token => {
            const tokenName = token[0];
            const tokenAddr = token[1];
            if (tokenAddr === key.toLowerCase()) {
              this.prices.set(tokenName, value.usd);
            }
          });
        }
      });

    getUNIPrice(provider).then(price =>
      this.prices.set("ZZZETHUNI", parseFloat(price.toFixed(2)))
    );

    getBPTPrice(provider).then(price => {
      this.prices.set("BPT", parseFloat(price.toFixed(2)));
    });
  }
}

export default new Prices();
