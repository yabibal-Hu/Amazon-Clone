import { AiOutlineMenu } from "react-icons/ai";
import React from "react";
import classes from "./Header.module.css";
import Form from "react-bootstrap/Form";

function LowerHeader() {
  return (
    <div>
      <div className={classes.lower__container}>
        <li>
          <p>{<AiOutlineMenu />} All</p>
        </li>
        <li>Today's Deals</li>
        <li>Costumer Service</li>
        <li>Rigistery</li>
        <li>Gift Card</li>
        <li>Sell</li>
        <Form.Select
          style={{
            backgroundColor: "#232f3e",
            color: "white",
            border: "none",
          }}
          className={classes.select}
          aria-label="Default select example"
        >
          <option value="0">All</option>
          <option value="1">Today's Deals</option>
          <option value="">Costumer Service</option>
          <option value="">Gift Card</option>
          <option value="">Sell</option>
        </Form.Select>
      </div>
    </div>
  );
}

export default LowerHeader;
