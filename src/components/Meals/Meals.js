import MealsSummary from "./MealsSummary";
import MealsList from "./MealsList";
import React from "react";

function Meals() {
  return (
    <React.Fragment>
      <MealsSummary />
      <MealsList />
    </React.Fragment>
  );
}

export default Meals;
