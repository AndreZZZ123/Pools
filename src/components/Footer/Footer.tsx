import React from "react";
import Button from "../Button/Button";
import githubicon from "../../assets/github_icon.png";
import twittericon from "../../assets/twitter_icon.svg";
import mediumicon from "../../assets/medium_icon.webp";
import emailicon from "../../assets/email_icon.svg";
import "./Footer.scss";

function Footer() {
  return (
    <div className="footer">
      <a
        href="https://github.com/zzz-finance/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button className="button-footer" icon={githubicon}>
          Github
        </Button>
      </a>
      <a
        href="https://twitter.com/zzzfinance/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button className="button-footer" icon={twittericon}>
          Twitter
        </Button>
      </a>
      <a
        href="https://medium.com/@zzzfinance/"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Button className="button-footer" icon={mediumicon}>
          Medium
        </Button>
      </a>
      <a href="mailto:hello@zzz.finance">
        <Button className="button-footer" icon={emailicon}>
          Email
        </Button>
      </a>
    </div>
  );
}

export default Footer;
