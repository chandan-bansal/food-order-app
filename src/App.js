import React, { useState } from "react";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import { Route, Switch } from "react-router-dom";
import Cart from "./components/Cart/Cart";
import Header from "./components/Layout/Header";
function App() {
  const [CartisOpen, setCartisOpen] = useState(false);
  const showCartHandler = (props) => {
    setCartisOpen(true);
  };

  const hideCartHandler = (props) => {
    setCartisOpen(false);
  };
  return (
    <div>
      {CartisOpen && <Cart onClose={hideCartHandler} />}
      <Header onOpen={showCartHandler} />
      <Switch>
        <Route path="/" exact>
          <HomePage />
        </Route>
        <Route path="/login">
          <LoginPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
