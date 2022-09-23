import React from "react";

const CartContext = React.createContext({
  items: [],
  totalAmount: 0,
  addItemToCartInsideCart: (item) => {},
  addItem: (item) => {},
  removeItem: (item) => {},
  resetCart: () => {},
  token: "",
  isLoggedIn: false,
  login: (token) => {},
  logout: () => {},
});

export default CartContext;
