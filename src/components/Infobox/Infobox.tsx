import React from "react";
import "./Infobox.scss";

function Infobox({ children }) {
  return <div className="infobox">{children}</div>;
}

Infobox.Title = ({ children }) => (
  <h3 className="infobox infobox-title">{children}</h3>
);

Infobox.Content = ({ children }) => (
  <div className="infobox infobox-content">{children}</div>
);

export default Infobox;
