import React from "react";
import classes from "../Cart/Checkout.module.css";

const TextError = (props) => {
  return <div className={classes["error-text"]}>{props.children}</div>;
};

export default TextError;
