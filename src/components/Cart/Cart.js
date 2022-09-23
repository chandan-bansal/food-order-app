import React, { useState, useContext } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartItem from "./CartItem";
import Checkout from "./Checkout";

import CartContext from "../../store/cart-context";

function Cart(props) {
  const [ischeckout, setIsCheckout] = useState(false);

  const [didSubmit, setDidSubmit] = useState(false);

  const cartCtx = useContext(CartContext);
  const totalAmount = cartCtx.totalAmount.toFixed(2);
  const hasItems = cartCtx.items.length > 0;
  const cartItemRemoveHandler = (item) => {
    cartCtx.removeItem(item);
  };
  const cartItemAddHandler = (item) => {
    cartCtx.addItemToCartInsideCart(item);
  };

  const orderHandler = () => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {
    await fetch(
      "https://food-order-app-bfb89-default-rtdb.asia-southeast1.firebasedatabase.app/order.json",
      {
        method: "POST",
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    setDidSubmit(true);
    cartCtx.resetCart();
  };

  const cartItems = (
    <ul className={classes["cart-items"]}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const cartModalContent = (
    <React.Fragment>
      {cartItems}

      <div className={classes.total}>
        <span> Total Amount </span>
        <span>&#x20B9; {totalAmount}</span>
      </div>
      {ischeckout && (
        <Checkout onConfirm={submitOrderHandler} onCancel={props.onClose} />
      )}

      {!ischeckout && (
        <div className={classes.actions}>
          <button onClick={props.onClose} className={classes["button--alt"]}>
            Close
          </button>
          {hasItems && (
            <button onClick={orderHandler} className={classes.button}>
              Order
            </button>
          )}
        </div>
      )}
    </React.Fragment>
  );

  const didSubmitModalcontent = (
    <React.Fragment>
      <p>
        Successfully sent the order! Order arriving at your doorstep in 45
        minutes
      </p>
      <div className={classes.actions}>
        <button onClick={props.onClose} className={classes.button}>
          Close
        </button>
      </div>
    </React.Fragment>
  );

  return (
    <Modal onClose={props.onClose}>
      {!didSubmit && cartModalContent}

      {didSubmit && didSubmitModalcontent}
    </Modal>
  );
}

export default Cart;
