import React, { useContext } from "react";
import classes from "./Header.module.css";
import HeaderButton from "./HeaderButton";
import { Link } from "react-router-dom";
import CartContext from "../../store/cart-context";

function Header(props) {
  const ctx = useContext(CartContext);
  const isLoggedIn = ctx.isLoggedIn;

  const logoutHandler = () => {
    ctx.logout();
  };
  return (
    <React.Fragment>
      <header className={classes.header}>
        <h1>Bharawan Da Dhaba</h1>
        <nav>
          <ul>
            {!isLoggedIn && (
              <li>
                <Link to="/login"> Login </Link>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <button onClick={logoutHandler}>Logout</button>
              </li>
            )}
            {isLoggedIn && (
              <li>
                <HeaderButton onClick={props.onOpen} />
              </li>
            )}
          </ul>
        </nav>
      </header>
      <div className={classes.mainImage}>
        <img
          src="https://raw.githubusercontent.com/academind/react-complete-guide-code/11-practice-food-order-app/extra-files/meals.jpg"
          alt="Hello"
        />
      </div>
    </React.Fragment>
  );
}

export default Header;
