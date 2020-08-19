import React from "react";
import "./Button.scss";

function Button({ children, ...props }) {
  const { className } = props;
  return (
    <button {...props} className={`button ${className ? className : ""}`}>
      {props.icon && <img src={props.icon} alt="" className="button-icon" />}
      {children}
    </button>
  );
}

export default Button;
