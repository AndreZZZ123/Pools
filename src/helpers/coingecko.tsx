async function getPricingFor(address: string, vs: string, getJson?: boolean) {
  const blob = await fetch(
    `https://api.coingecko.com/api/v3/simple/token_price/ethereum?contract_addresses=${address}&vs_currencies=${vs}`
  );
  const json = await blob.json();
  let result: any = null;
  for (const [, value] of Object.entries(json)) {
    result = value;
  }
  return getJson ? json : result;
}

export default {
  getPricingFor
};
