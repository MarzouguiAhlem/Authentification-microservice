import React from "react";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import FacebookIcon from "@mui/icons-material/Facebook";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import FacebookTwoToneIcon from "@mui/icons-material/FacebookTwoTone";
import FacebookSharpIcon from "@mui/icons-material/FacebookSharp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { grey } from "@mui/material/colors";
import "./Footer.css";
const Footer = () => {
  return (
    <>
      <a href="#">
        <i className="fa-solid fa-circle-chevron-up go-top"></i>
      </a>
      <div className="footer-div">
        <div className="footer-list">
          <a href="https://www.facebook.com" target={"blank"}>
            <i className="fa-brands fa-facebook-f footer-icon"></i>
          </a>
          <a href="https://twitter.com" target={"blank"}>
            <i className="fa-brands fa-twitter footer-icon"></i>
          </a>
          <a href="https://www.linkedin.com" target={"blank"}>
            <i className="fa-brands fa-linkedin footer-icon"></i>
          </a>
          <a href="http://instagram.com" target={"blank"}>
            <i className="fa-brands fa-instagram footer-icon"></i>
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
