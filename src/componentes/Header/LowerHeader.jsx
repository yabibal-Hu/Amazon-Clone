import { AiOutlineMenu } from "react-icons/ai";
import React from "react";
import classes from "./Header.module.css";

function LowerHeader() {
  return (
    <div >
      <ul className={classes.lower__container}>
        <li>
          <p>{<AiOutlineMenu />}{" "}All</p>
        </li>
        <li>Today's Deals</li>
        <li>Costumer Service</li>
        <li>Rigistery</li>
        <li>Gift Card</li>
        <li>Sell</li>
      </ul>
    </div>
  );
}

export default LowerHeader;
