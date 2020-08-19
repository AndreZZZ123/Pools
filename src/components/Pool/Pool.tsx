import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import {
  checkAllowance,
  getAllowance,
  getCurrentTotalStake,
  getRewardsAvailable,
  getStakedBalance
} from "../../helpers/eth";
import { Pool as IPool } from "../../types";
import Button from "../Button/Button";
import "./Pool.scss";

type Props = {
  pool: IPool;
};

function Pool({ pool }: Props) {
  const { active, account, library } = useWeb3React();
  const [hasAllowance, setHasAllowance] = useState(false);
  const [earned, setEarned] = useState(0);
  const [staked, setStaked] = useState(0);
  const [totalStake, setTotalStake] = useState(0);

  const userPercentageOfTotal = staked > 0 ? (staked / totalStake) * 100 : 0;

  useEffect(() => {
    if (!!account) {
      checkAllowance(account, pool, library).then(setHasAllowance);
      getStakedBalance(account, pool, library).then(setStaked);
      getCurrentTotalStake(pool, library).then(setTotalStake);
      getRewardsAvailable(account, pool, library).then(setEarned);
    }
  }, [active, library, account, pool]);

  return (
    <div className="pool">
      <div className="pool-title">
        <div role="img" className="pool-icon">
          {pool.poolIcon}
        </div>
        <h2>{pool.name}</h2>
      </div>
      <section className="pool-content">
        <div className="pool-info">{pool.info}</div>
        <div className="pool-extra">
          <h3 className="pool-extra-title">
            Staking {staked} {pool.token.name} of {Math.trunc(totalStake)}{" "}
            {pool.token.name} <br />
            {userPercentageOfTotal.toFixed(4)}% of total
          </h3>
          <h3 className="pool-extra-title">
            Rewards{" "}
            <span role="img" aria-label="star">
              ⭐️
            </span>{" "}
            {earned} {pool.reward.name}
          </h3>
        </div>
        {!hasAllowance && (
          <Button
            onClick={() => getAllowance(account, pool, library.getSigner())}
          >
            Approve token
          </Button>
        )}
        <Button className={!hasAllowance ? "disabled" : ""}>Stake</Button>
      </section>
    </div>
  );
}

Pool.Title = ({ children }) => <div className="pool-title">{children}</div>;
Pool.Content = ({ children }) => <div className="pool-content">{children}</div>;

export default Pool;
