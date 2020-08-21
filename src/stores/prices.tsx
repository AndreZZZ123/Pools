import { observable, action } from "mobx";
import { tokens } from "../misc/contracts";
import coingecko from "../helpers/coingecko";
import { getUNIPrice, getBPTPrice } from "../helpers/eth";

class Prices {
  @observable prices: Map<string, number> = new Map();
  @observable provider: any;

  @action setProvider(arg) {
    this.provider = arg;
  }
  @action fetchPrices() {
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

    getUNIPrice(this.provider).then(price =>
      this.prices.set("ZZZETHUNI", parseFloat(price.toFixed(2)))
    );

    getBPTPrice(this.provider).then(price => {
      this.prices.set("BPT", parseFloat(price.toFixed(2)));
    });
  }
}

export default new Prices();
