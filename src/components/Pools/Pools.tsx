import React from "react";
import Pool from "../Pool/Pool";
import poolicon from "../../assets/swimming_pool.svg";
import { pools } from "../../misc/contracts";
import "./Pools.scss";

function Pools() {
  return (
    <div className="pools">
      <img src={poolicon} width="312" className="pool-icon" alt="pool" />
      <div className="pools-container">
        {pools.map(pool => (
          <Pool pool={pool} key={pool.name} />
        ))}
      </div>
    </div>
  );
}

export default Pools;
