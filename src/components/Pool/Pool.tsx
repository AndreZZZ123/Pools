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
import Spinner from "../Spinner/Spinner";
import Modal from "react-modal";
import "./Pool.scss";
import BoostingInfo from "../BoostingInfo/BoostingInfo";

Modal.setAppElement("#root");

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    backgroundColor: "rgba(0,0,0,0.8)"
  }
};

type Props = {
  pool: IPool;
};

const boostLevels: any[][] = [
  [1, "10%"],
  [2, "20%"],
  [3, "40%"]
];

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
  const napsAmount = PricesStore.balances.get("NAPS");
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

  const [modalIsOpen, setIsOpen] = React.useState(false);
  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  return (
    <div className="pool">
      <div className="pool-title">
        <div role="img" className="pool-icon">
          {pool.poolIcon}
        </div>
        {pool.boostAvailable && (
          <div className="boosting-info" onClick={() => openModal()}>
            boosting info
          </div>
        )}
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeModal}
          contentLabel="Boosting info"
          style={customStyles}
        >
          <BoostingInfo />
        </Modal>
        <h2>{pool.uiName}</h2>
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
        {pool.boostAvailable && hasBoostAllowance && boostCosts.length && (
          <div className="boost-buttons">
            {boostMultiplier > 1 && (
              <span>
                Boost multiplier{" "}
                <b>{((boostMultiplier - 1) * 100).toFixed(0)}%</b>
              </span>
            )}
            {boostLevels.map(([level, percentage]) => {
              const isActive = level === boostLevel;
              const boostCostForLevel = boostCosts[level - 1];
              const tooPoor =
                !!boostCostForLevel &&
                parseFloat(napsAmount) < parseFloat(boostCostForLevel);
              if (level < boostLevel) return null;
              return (
                <Button
                  className={`boost-button boost-button-level-${level} ${
                    isActive ? "active" : ""
                  } ${tooPoor ? " disabled" : ""}`}
                  onClick={() => !tooPoor && boost(level, pool, signer)}
                  key={`boost-level${level}`}
                >
                  Level {level} <br />
                  <Spinner
                    type="ThreeDots"
                    width={25}
                    height={25}
                    condition={boostCosts.length}
                  >
                    {boostCostForLevel} NAPS <br />+{percentage} MULTI
                  </Spinner>
                </Button>
              );
            })}
          </div>
        )}
        {parseFloat(maxAmount) > 0 && hasAllowance ? (
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

                  {parseFloat(maxAmount) > 0 && (
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
