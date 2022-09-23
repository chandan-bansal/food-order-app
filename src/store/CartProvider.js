import CartContext from "./cart-context";
import { useReducer, useState, useEffect, useCallback } from "react";

const cartReducer = (state, action) => {
  if (action.type === "ADD") {
    const updatedTotalAmount =
      state.totalAmount + action.item.price * action.item.amount;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + action.item.amount,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "ADD_IN_CART") {
    const updatedTotalAmount = state.totalAmount + action.item.price;

    const existingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const existingCartItem = state.items[existingCartItemIndex];
    let updatedItems;

    if (existingCartItem) {
      const updatedItem = {
        ...existingCartItem,
        amount: existingCartItem.amount + 1,
      };
      updatedItems = [...state.items];
      updatedItems[existingCartItemIndex] = updatedItem;
    } else {
      updatedItems = state.items.concat(action.item);
    }

    return {
      items: updatedItems,
      totalAmount: updatedTotalAmount,
    };
  }
  if (action.type === "REMOVE") {
    const ExistingCartItemIndex = state.items.findIndex(
      (item) => item.id === action.item.id
    );
    const ExistingItem = state.items[ExistingCartItemIndex];
    let UPdatedItem, UPdatedItems;

    if (ExistingItem.amount === 1) {
      return {
        items: state.items.filter((item) => item.id !== action.item.id),
        totalAmount: state.totalAmount - ExistingItem.price,
      };
    } else {
      UPdatedItem = {
        ...ExistingItem,
        amount: ExistingItem.amount - 1,
      };

      UPdatedItems = [...state.items];
      UPdatedItems[ExistingCartItemIndex] = UPdatedItem;

      return {
        items: UPdatedItems,
        totalAmount: state.totalAmount - ExistingItem.price,
      };
    }
  }
  if (action.type === "RESET") {
    return { items: [], totalAmount: 0 };
  }
  return { items: [], totalAmount: 0 };
};

const calculateRemainingTime = (expirationTime) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingTime = adjExpirationTime - currentTime;
  return remainingTime;
};

let logoutTimer;

const retrieveStoredToken = () => {
  const storedToken = localStorage.getItem("token");
  const storedExpirationDate = localStorage.getItem("expirationTime");

  const remainingTime = calculateRemainingTime(storedExpirationDate);

  if (remainingTime <= 3600) {
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    return null;
  }

  return {
    token: storedToken,
    duration: remainingTime,
  };
};

function CartProvider(props) {
  const [cartState, dispatchCart] = useReducer(cartReducer, {
    items: [],
    totalAmount: 0,
  });

  const tokenData = retrieveStoredToken();
  let initialToken;
  if (tokenData) {
    initialToken = tokenData.token;
  }
  const [token, setToken] = useState(initialToken);
  const userIsLoggedIn = !!token;

  const userLogoutHandler = useCallback(() => {
    setToken(null);
    localStorage.removeItem("token");
    localStorage.removeItem("expirationTime");
    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }
  }, []);

  const userLoginHandler = (token, expirationTime) => {
    setToken(token);
    localStorage.setItem("token", token);
    localStorage.setItem("expirationTime", expirationTime);
    const remainingTime = calculateRemainingTime(expirationTime);
    logoutTimer = setTimeout(userLogoutHandler, remainingTime);
  };

  useEffect(() => {
    if (tokenData) {
      console.log(tokenData.duration);
      logoutTimer = setTimeout(userLogoutHandler, tokenData.duration);
    }
  }, [tokenData, userLogoutHandler]);

  const addItemtoCartInCart = (item) => {
    dispatchCart({ type: "ADD_IN_CART", item: item });
  };

  const addItemtoCart = (item) => {
    dispatchCart({ type: "ADD", item: item });
  };

  const removeItemfromCart = (item) => {
    dispatchCart({ type: "REMOVE", item: item });
  };

  const ClearCartHandler = () => {
    dispatchCart({ type: "RESET" });
  };

  const cartContext = {
    items: cartState.items,
    totalAmount: cartState.totalAmount,
    addItemToCartInsideCart: addItemtoCartInCart,
    addItem: addItemtoCart,
    removeItem: removeItemfromCart,
    resetCart: ClearCartHandler,
    token: token,
    isLoggedIn: userIsLoggedIn,
    login: userLoginHandler,
    logout: userLogoutHandler,
  };
  return (
    <CartContext.Provider value={cartContext}>
      {props.children}
    </CartContext.Provider>
  );
}

export default CartProvider;
