import classes from "./MealItemForm.module.css";
import Input from "../../UI/Input";
import { useRef, useState, useContext } from "react";
import CartContext from "../../../store/cart-context";

function MealItemForm(props) {
  const amountInputRef = useRef();
  const [formIsValid, setFormIsValid] = useState(true);
  const ctx = useContext(CartContext);
  const isLoggedIn = ctx.isLoggedIn;

  function submitHandler(event) {
    event.preventDefault();
    const enteredAmount = amountInputRef.current.value;
    const enteredAmountNum = +enteredAmount;
    if (enteredAmount.trim().length === 0 || enteredAmount > 5) {
      setFormIsValid(false);
      return;
    }

    props.onAddtoCart(enteredAmountNum);
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <Input
        ref={amountInputRef}
        label="Amount"
        input={{
          id: "amount_" + props.id,
          min: "1",
          type: "number",
          step: "1",
          defaultValue: 1,
        }}
      />
      {isLoggedIn && <button>+ Add</button>}
      {!isLoggedIn && <p>Log-in to add </p>}
      {!formIsValid && <p> Please Enter a Valid Amount (1-5)</p>}
    </form>
  );
}

export default MealItemForm;
