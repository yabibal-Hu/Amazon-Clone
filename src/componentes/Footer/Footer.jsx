import React from "react";
import classes from "./Footer.module.css";

function Footer() {
  return (
    <>
      <button className={classes.topBtn} onClick={() => window.scrollTo(0, 0)}>Back to top</button>
      <div className={classes.footer__container}>
        <div>
          <p> Get to Know Us</p>
          <ul>
            <li>
              <a >Careers</a>
            </li>
            <li>
              <a >Blog</a>
            </li>
            <li>
              <a >About Amazon</a>
            </li>
            <li>
              <a >
                Investor Relations
              </a>
            </li>
            <li>
              <a >Amazon Devices</a>
            </li>
            <li>
              <a >Amazon Science</a>
            </li>
          </ul>
        </div>
        <div>
          <p>make money with us</p>

          <ul>
            <li>
              <a >
                Sell products on Amazon
              </a>
            </li>
            <li>
              <a >
                Sell on Amazon Business
              </a>
            </li>
            <li>
              <a >Sell apps on Amazon</a>
            </li>
            <li>
              <a >Become an Affiliate</a>
            </li>
            <li>
              <a >
                Advertise Your Products
              </a>
            </li>
            <li>
              <a >
                Self-Publish with Us
              </a>
            </li>
            <li>
              <a >Host an Amazon Hub</a>
            </li>
            <li>
              <a >
                › See More Make Money with Us
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p> Amazon Payment Products</p>

          <ul>
            <li>
              <a h>
                Amazon Business Card
              </a>
            </li>
            <li>
              <a >
                Shop with Points
              </a>
            </li>
            <li>
              <a >
                Reload Your Balance
              </a>
            </li>
            <li>
              <a >
                Amazon Currency Converter
              </a>
            </li>
          </ul>
        </div>
        <div>
          <p>Let Us Help You</p>

          <ul>
            <li>
              <a >Amazon and COVID-19</a>
            </li>
            <li>
              <a >Your Account</a>
            </li>
            <li>
              <a >Your Orders</a>
            </li>
            <li>
              <a >
                Shipping Rates & Policies
              </a>
            </li>
            <li>
              <a >
                Returns & Replacements
              </a>
            </li>
            <li>
              <a >
                Manage Your Content and Devices
              </a>
            </li>
            <li>
              <a >Help</a>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}

export default Footer;
