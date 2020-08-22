import React from "react";
import "./BoostingInfo.scss";

function BoostingInfo() {
  return (
    <div className="boosting-info-content">
      <h2>Multiplier / Boosting</h2>
      <p>A multiplier effect has been created for holding or staking ZZZ.</p>
      <p>
        It is crucial to note that these are linked to individual ETH addresses.
        Bonuses do not cross across addresses.{" "}
      </p>
      <p>
        Currently, this multiplier is in effect for the following: Staking ZZZ
        in the Dreamer pool (Pool B which is the ZZZ staking pool prior to these
        upgrades). ZZZ held in your wallet. ZZZ in your UNI tokens associated
        with the ETH/ZZZ Uni token Liquidity Pool on Uniswap.
      </p>
      <p>
        As a thank you for contributing to the liquidity pool, the ZZZs in these
        UNI tokens themselves will count as double (if you have 5 ZZZs in your
        UNI tokens, it will count as 10). More methods of holding and staking
        ZZZ will be added in the future.
      </p>
      <p>Here’s the breakdown on the multiplier:</p>
      <h3>1. Global Multiplier for ZZZ in Wallet</h3>
      <p>
        This is a global effect, with some exceptions based on the needs of the
        individual pools.
      </p>
      <p>The following tiered bonus structure applies:</p>
      <p>
        1 ZZZ = 2% <br />
        5 ZZZ = 10% <br />
        10 ZZZ = 30% <br />
        20 ZZZ = 60% <br />
      </p>
      <h3>2. Local Multiplier for SPENDING NAP</h3>
      <p>
        In addition to the multiplier for staking ZZZs, you may also spend NAPs
        to get bonuses on individual pools. Depending on the amount you spend,
        increases your bonus. This effect works exclusively on the pools you
        choose. <br />
        <br />
        Level 1: 10,000 NAP:10% <br />
        Level 2: 20,000 NAP: 20% <br />
        Level 3: 30,000 NAP: 40% <br />
      </p>
      <h3>3. Step Down Effect</h3>
      <p>
        To help increase the ability to gain a bonus that both rewards early
        adopters (who may have larger balances) and newcomers (who may have
        small balances), we have implemented a solution that we like to call
        ‘Step Down’ on the cost of the NAPs bonuses.
      </p>
      <p>
        The cost of the multipliers drop by 10% every 8 hours. This will occur 5
        times, and then hold steady.
      </p>
      <p>
        Level 1 step down numbers: 10,000, 9,000, 8,100, 7,290, 6,561, 5,904.9{" "}
        <br />
        Level 2 step down numbers: 20,000, 18,000, 16,200, 14,580, 13,122,
        11,809.8 <br />
        Level 3 step down numbers: 30,000, 27,000, 24,300, 21,870, 19,683,
        17,714.7 <br />
      </p>
      <h3>What happens to your NAP once spent?</h3>
      <p>
        We decided to go with a self sustaining ecosystem where the multipliers
        spent (NAP) will be distributed back into the ecosystem at a ratio of
        50% to fund rewards for future Pools, and 50% towards the Dev Fund to
        fund future initiatives, project needs, and community proposals that
        will be voted on through our upcoming, decentralized governance system.
      </p>
      <p>
        This ensures the long term health and viability of the ZZZ ecosystem,
        thus allowing us to enrich the governance model where we are able to
        afford the swift execution and implementation of the proposals voted on
        by our community Holders.
      </p>
      <p>
        Most importantly, everyone may decide for themselves if they wish to
        apply the NAP multiplier and, by doing so, not only get better rewards,
        but also make the project grow by fostering development and more pools.
      </p>
      <p>
        The idea of a self-sustaining, growing ecosystem model without inflation
        puts us in a very unique position, and sets the ZZZ and NAP protocols
        apart from other major yield farming projects out there in the DeFi
        space in both stability and sustainability.
      </p>
    </div>
  );
}

export default BoostingInfo;
