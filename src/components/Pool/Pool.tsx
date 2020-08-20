import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import {
  checkAllowance,
  getAllowance,
  getCurrentTotalStake,
  getERC20balance,
  getRewardsAvailable,
  getStakedBalance,
  getYieldsFor,
  stake,
  claim,
  exit
} from "../../helpers/eth";
import { Pool as IPool } from "../../types";
import BasicInput from "../BasicInput/BasicInput";
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
  const [stakeAmount, setStakeAmount] = useState("0");
  const [maxAmount, setMaxAmount] = useState("0");

  const userPercentageOfTotal = staked > 0 ? (staked / totalStake) * 100 : 0;

  const signer = library.getSigner();

  const [yields, setYields] = useState<any>(null);

  useEffect(() => {
    if (!!account) {
      checkAllowance(account, pool, library).then(setHasAllowance);
      getStakedBalance(account, pool, library).then(setStaked);
      getCurrentTotalStake(pool, library).then(setTotalStake);
      getRewardsAvailable(account, pool, library).then(setEarned);
      getERC20balance(account, pool.token, library).then(setMaxAmount);
      getYieldsFor(pool.name, account, library).then(setYields);
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
        {yields && (
          <div className="pool-yields">
            <div>
              WPY +<b>{yields.weeklyROI}%</b>
            </div>
            <div>
              APY +<b>{yields.yearlyROI}%</b>
            </div>
          </div>
        )}
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
            {earned.toFixed(4)} {pool.reward.name}
          </h3>
          {staked > 0 && (
            <div className="claim-exit-buttons">
              <Button
                onClick={() => claim(pool, signer)}
                className={`staking-button ${!hasAllowance ? "disabled" : ""}`}
              >
                Claim
              </Button>
              <Button
                onClick={() => exit(pool, signer)}
                className={`staking-button ${!hasAllowance ? "disabled" : ""}`}
              >
                <div className="exit-button-text">
                  Exit
                  <div className="extra-info">Claim & Remove stake</div>
                </div>
              </Button>
            </div>
          )}
        </div>
        {!hasAllowance && (
          <Button onClick={() => getAllowance(account, pool, signer)}>
            Approve token
          </Button>
        )}
        <div className="stake">
          {hasAllowance && (
            <>
              <BasicInput
                onChange={e => setStakeAmount(e.target.value)}
                className="zzz-amount"
                type="number"
                name={"Amount"}
                value={stakeAmount}
              />
              <Button
                onClick={() => setStakeAmount(maxAmount)}
                className={`max-button`}
              >
                Max
              </Button>
            </>
          )}
        </div>
        <Button
          onClick={() => stake(pool, signer, stakeAmount)}
          className={`staking-button ${!hasAllowance ? "disabled" : ""}`}
        >
          Stake
        </Button>
      </section>
    </div>
  );
}

Pool.Title = ({ children }) => <div className="pool-title">{children}</div>;
Pool.Content = ({ children }) => <div className="pool-content">{children}</div>;

export default Pool;
