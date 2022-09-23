import classes from "./HeaderButton.module.css";
import { useContext, useEffect, useState } from "react";
import CartContext from "../../store/cart-context";

function HeaderButton(props) {
  const [buttonAnimation, setButtonAnimation] = useState(false);

  const cartCtx = useContext(CartContext);
  const { items } = cartCtx;

  let buttonClass = `${classes.button} ${buttonAnimation ? classes.bump : ""}`;

  useEffect(() => {
    if (items.length === 0) {
      return;
    }
    setButtonAnimation(true);

    const timer = setTimeout(() => {
      setButtonAnimation(false);
    }, 300);

    return () => {
      clearTimeout(timer);
    };
  }, [items]);
  return (
    <button className={buttonClass} onClick={props.onClick}>
      <span className={classes.icon}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
        </svg>
      </span>
      <span>Your Cart</span>
      <span className={classes.badge}>
        {items.reduce((curNum, item) => {
          return curNum + item.amount;
        }, 0)}
      </span>
    </button>
  );
}

export default HeaderButton;
