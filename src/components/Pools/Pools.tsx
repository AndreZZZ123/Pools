import React, { useState } from "react";
import Pool from "../Pool/Pool";
import swimmingPoolImg from "../../assets/swimming_pool.svg";
import lavaPoolImg from "../../assets/lava_pool.png";
import { pools, experiments } from "../../misc/contracts";
import "./Pools.scss";

function Pools() {
  const poolsLocal = localStorage.getItem("zzz-pools-selected");
  const [currentTab, setTab] = useState(poolsLocal || 'regular');

  function setCurrentPoolsSelected(currentTab: any) {
    setTab(currentTab);

    const tab = currentTab.toString();
    var tmpTab  = tab.match("'(.*)'");
    var newTab = tmpTab[1];

    localStorage.setItem("zzz-pools-selected", newTab);
  }

  return (
    <div className={`pools -${currentTab}`}>
      <div className="pool-selection">
        <div className="pools-title-container">

          <div className="pools-selector-container">
            <h1>Open Pools</h1>
            {/* implement apy class to pull best apy */}
            <p>Best APY +XX.XX%</p>
          
            <img
              onClick={() => { setCurrentPoolsSelected(() => 'regular') }}
              src={swimmingPoolImg}
              width="280"
              height="165"
              className="swimming-pool-icon"
              alt="swimming-pool"
            />
            </div>
            <div className="pools-selector-container">
              <h1>New Pools</h1>
              {/* implement apy class to pull best apy */}
              <p>Best APY <span className="green">+XX.XX%</span></p>
              <img
                onClick={() => { setCurrentPoolsSelected(() => 'experiments') }}
                src={lavaPoolImg}
                
                height="165"
                className="lava-pool-icon"
                alt="lava-pool"
              />
            </div>
          </div>
        </div>
      <div className="pools-container">
        {currentTab == "regular" && pools.map(pool => <Pool pool={pool} key={pool.name} />)}
        {currentTab == "experiments" && experiments.map(pool => <Pool pool={pool} key={pool.name} />)}
      </div>
    </div>
  );
}

export default Pools;
