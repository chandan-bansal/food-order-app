import React from "react";
import classes from "./MealItem.module.css";
import MealItemForm from "./MealItemForm";
import CartContext from "../../../store/cart-context";
import { useContext } from "react";

function MealItem(props) {
  const cartCtx = useContext(CartContext);

  const addtoCartHandler = (amount) => {
    cartCtx.addItem({
      id: props.id,
      price: props.price,
      name: props.name,
      amount: amount,
    });
  };

  return (
    <li className={classes.meal} key={props.id}>
      <div>
        <h2> {props.name} </h2>
        <div className={classes.description}> {props.description} </div>
        <div className={classes.price}> &#x20B9; {props.price} </div>
      </div>
      <div>
        <MealItemForm id={props.id} onAddtoCart={addtoCartHandler} />
      </div>
    </li>
  );
}

export default MealItem;
