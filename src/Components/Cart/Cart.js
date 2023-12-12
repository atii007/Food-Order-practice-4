import React from "react";
import { useContext, useState } from "react";
import Modal from "../UI/Modal";
import classes from "./Cart.module.css";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

const Cart = (props) => {
  const [orderSubmitting, setOrderSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    cartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = () => {
    setCheckingOut(true);
  };

  const submitOrderHandler = async (userData) => {
    setOrderSubmitting(true);
    await fetch(
      "https://react-database-8cbf4-default-rtdb.firebaseio.com/orders.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderItems: cartCtx.items,
        }),
      }
    );
    setOrderSubmitting(false);
    setDidSubmit(true);
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );
  const modalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          Order
        </button>
      )}
    </div>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}
      <div className={classes.total}>
        <span>Total Amount</span>
        <span>{totalAmount}</span>
      </div>
      {checkingOut && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}
      {!checkingOut && modalActions}
    </React.Fragment>
  );

  const isSubmittingContentModal = <p>Submitting Order</p>;
  const didSubmitContentModal = (
    <div className={classes.actions}>
      <p>Hurrah!!! Order placed Successfully!</p>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
    </div>
  );

  return (
    <Modal onClose={props.onClose}>
      {!orderSubmitting && !didSubmit && cartModalContent}
      {orderSubmitting && isSubmittingContentModal}
      {!orderSubmitting && didSubmit && didSubmitContentModal}
    </Modal>
  );
};

export default Cart;
