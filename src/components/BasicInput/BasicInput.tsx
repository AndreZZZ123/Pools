import React from "react";
import "./BasicInput.scss";

type Props = {
  name: string;
  type: string;
  className?: string;
  onChange: any;
  value: any;
};
function BasicInput({
  name,
  type,
  className,
  onChange,
  value,
  ...props
}: Props) {
  return (
    <div
      {...props}
      className={`input-container input-${type} ${className ? className : ""}`}
    >
      <label htmlFor={name}>{name}</label>
      <input onChange={onChange} name={name} type={type} value={value} />
    </div>
  );
}

export default BasicInput;
