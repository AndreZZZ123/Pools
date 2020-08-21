import React from "react";
import Loader from "react-loader-spinner";

type Props = {
  children: any;
  condition: any;
  width?: number;
  height?: number;
  type?: string;
};

function Spinner({
  children,
  condition,
  width = 50,
  height = 50,
  type = "Puff"
}) {
  if (!condition) {
    return (
      <Loader
        type={type}
        color="#00BFFF"
        height={height}
        width={width}
        timeout={2500}
      />
    );
  }
  if (condition) {
    return children;
  }
}

export default Spinner;
