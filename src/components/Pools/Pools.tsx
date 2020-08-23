import React, { useState } from "react";
import Pool from "../Pool/Pool";
import swimmingPoolImg from "../../assets/swimming_pool.svg";
import lavaPoolImg from "../../assets/lava_pool.svg";
import { pools, experiments } from "../../misc/contracts";
import "./Pools.scss";

function Pools() {
  const [currentTab, setTab] = useState('regular');

  return (
    <div className={`pools -${currentTab}`}>
      <div className="pool-selection">
        <img
          onClick={() => { setTab(() => 'regular') }}
          src={swimmingPoolImg}
          width="280"
          className="swimming-pool-icon"
          alt="swimming-pool"
        />
        <img
          onClick={() => { setTab(() => 'experiments') }}
          src={lavaPoolImg}
          width="280"
          className="lava-pool-icon"
          alt="lava-pool"
        />
      </div>
      <div className="pools-container">
        {currentTab == "regular" && pools.map(pool => <Pool pool={pool} key={pool.name} />)}
        {currentTab == "experiments" && experiments.map(pool => <Pool pool={pool} key={pool.name} />)}
      </div>
    </div>
  );
}

export default Pools;
