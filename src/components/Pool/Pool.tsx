import { useWeb3React } from "@web3-react/core";
import React, { useEffect, useState } from "react";
import { observer } from "mobx-react";
import {
  checkAllowance,
  checkBoostAllowance,
  getAllowance,
  getCurrentTotalStake,
  getERC20balance,
  getRewardsAvailable,
  getStakedBalance,
  getYieldsFor,
  stake,
  claim,
  exit,
  getBoostAllowance,
  boost,
  getBoostLevel,
  getBoostMultiplier,
  getBoostCosts
} from "../../helpers/eth";
import { Pool as IPool } from "../../types";
import BasicInput from "../BasicInput/BasicInput";
import Button from "../Button/Button";
import PricesStore from "../../stores/prices";
import "./Pool.scss";
import Spinner from "../Spinner/Spinner";

type Props = {
  pool: IPool;
};

const boostLevels = [1, 2, 3];

function getWPYusd(poolName, staked, tokenPrice, rewardPerToken) {
  if (poolName === "ZZZ") {
    return rewardPerToken * staked * tokenPrice;
  } else {
    return null;
  }
}

function Pool({ pool }: Props) {
  const { active, account, library } = useWeb3React();
  const [hasAllowance, setHasAllowance] = useState(false);
  const [hasBoostAllowance, setHasBoostAllowance] = useState(false);
  const [boostLevel, setBoostLevel] = useState(0);
  const [boostMultiplier, setBoostMultiplier] = useState(0);
  const [earned, setEarned] = useState(0);
  const [staked, setStaked] = useState(0);
  const [totalStake, setTotalStake] = useState(0);
  const [stakeAmount, setStakeAmount] = useState("0");
  const [maxAmount, setMaxAmount] = useState("0");
  const [loadingYield, setLoadingYield] = useState(true);
  const [boostCosts, setBoostCosts] = useState<any[]>([]);
  const userPercentageOfTotal = staked > 0 ? (staked / totalStake) * 100 : 0;

  const signer = library.getSigner();

  const tokenPrice = PricesStore.prices.get(pool.reward.name);
  const [yields, setYields] = useState<any>(null);

  let earnedUSD: null | number = null;
  let weeklyROIUSD: null | number = null;
  if (earned > 0) {
    if (tokenPrice) {
      earnedUSD = tokenPrice * earned;
      if (yields && yields.weeklyROI && tokenPrice) {
        weeklyROIUSD = getWPYusd(
          pool.name,
          staked,
          tokenPrice,
          yields.rewardPerToken
        );
      }
    }
  }

  useEffect(() => {
    if (!!account) {
      checkAllowance(account, pool, library).then(setHasAllowance);
      getStakedBalance(account, pool, library).then(setStaked);
      getCurrentTotalStake(pool, library).then(setTotalStake);
      getRewardsAvailable(account, pool, library).then(setEarned);
      getERC20balance(account, pool.token, library).then(setMaxAmount);
      getYieldsFor(pool.name, account, library).then(res => {
        setYields(res);
        setLoadingYield(false);
      });
      if (pool.boostAvailable) {
        checkBoostAllowance(account, pool, library).then(setHasBoostAllowance);
        getBoostLevel(account, pool, library).then(setBoostLevel);
        getBoostMultiplier(account, pool, library).then(setBoostMultiplier);
        getBoostCosts(pool, library).then(setBoostCosts);
      }
    }
  }, [active, library, account, pool]);

  return (
    <div className="pool">
      <div className="pool-title">
        <div role="img" className="pool-icon">
          {pool.poolIcon}
        </div>
        <h2>{pool.name} Pool</h2>
      </div>
      <section className="pool-content">
        <div className="pool-info">{pool.info}</div>
        <Spinner
          type="ThreeDots"
          width={25}
          height={25}
          condition={!loadingYield}
        >
          {yields && (
            <div className="pool-yields">
              <div>
                WPY +<b>{yields && yields.weeklyROI}%</b>
                {weeklyROIUSD && <span> = ${weeklyROIUSD.toFixed(2)}</span>}
              </div>
              <div>
                APY +<b>{yields && yields.yearlyROI}%</b>
                {weeklyROIUSD && (
                  <span> = ${(weeklyROIUSD * 52).toFixed(2)}</span>
                )}
              </div>
            </div>
          )}
        </Spinner>
        <div className="pool-extra">
          <h4 className="pool-extra-title">
            Staking <b>{staked}</b> {pool.token.name} of{" "}
            <b>{Math.trunc(totalStake)}</b> {pool.token.name} <br />
            <b>{userPercentageOfTotal.toFixed(4)}%</b> of total
          </h4>
          <h3 className="pool-extra-title">
            Rewards
            <span role="img" aria-label="star">
              ⭐️
            </span>{" "}
            <b>{earned.toFixed(4)}</b> {pool.reward.name}
          </h3>
          <Spinner condition={!!earnedUSD}>
            <div className="earned-usd">${earnedUSD?.toFixed(2)}</div>
          </Spinner>
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
        {pool.boostAvailable && !hasBoostAllowance && hasAllowance && (
          <Button onClick={() => getBoostAllowance(account, pool, signer)}>
            Approve boost
          </Button>
        )}
        {pool.boostAvailable && hasBoostAllowance && (
          <div className="boost-buttons">
            Boost multiplier <b>{(boostMultiplier - 1) * 100}%</b>
            {boostLevels.map(level => {
              const isActive = level === boostLevel;
              if (level < boostLevel) return null;
              return (
                <Button
                  className={`boost-button ${isActive ? "active" : ""} ${
                    boostLevel > level ? " disabled" : ""
                  }`}
                  onClick={() => boost(level, pool, signer)}
                >
                  Level {level} <br />
                  <Spinner
                    type="ThreeDots"
                    width={25}
                    height={25}
                    condition={boostCosts.length}
                  >
                    {boostCosts[level - 1]} NAPS
                  </Spinner>
                </Button>
              );
            })}
          </div>
        )}
        {parseInt(maxAmount) > 0 ? (
          <>
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

                  {parseInt(maxAmount) > 0 && (
                    <Button
                      onClick={() => setStakeAmount(maxAmount)}
                      className={`max-button`}
                    >
                      Max
                    </Button>
                  )}
                </>
              )}
            </div>
            <Button
              onClick={() => stake(pool, signer, stakeAmount)}
              className={`staking-button ${!hasAllowance ? "disabled" : ""}`}
            >
              Stake
            </Button>
          </>
        ) : (
          hasAllowance && (
            <div className="cannot-stake">
              <b>Nothing to stake!</b>
              <a
                href={pool.buyAssetFrom}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>Get {pool.token.name}</Button>
              </a>
            </div>
          )
        )}
      </section>
    </div>
  );
}

Pool.Title = ({ children }) => <div className="pool-title">{children}</div>;
Pool.Content = ({ children }) => <div className="pool-content">{children}</div>;

export default observer(Pool);
