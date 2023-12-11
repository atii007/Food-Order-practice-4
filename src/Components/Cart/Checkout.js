import React from "react";
import classes from "./Checkout.module.css";
const Checkout = (props) => {
  return (
    <form>
      <div className={classes.control}>
        <label htmlFor="name">Name</label>
        <input name="name" id="name" type="text" />
      </div>
      <div className={classes.control}>
        <label htmlFor="phone">Phone Number</label>
        <input name="phone" id="phone" type="number" />
      </div>
      <div className={classes.control}>
        <label htmlFor="address">Address</label>
        <input name="address" id="address" type="text" />
      </div>
      <div className={classes.control}>
        <label htmlFor="code">Postal Code</label>
        <input name="code" id="code" type="number" />
      </div>
      <div>
        <button type="submit" className={classes["form-actions"]}>
          Checkout
        </button>
      </div>
    </form>
  );
};

export default Checkout;
