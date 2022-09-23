import React, { useState, useEffect } from "react";
import classes from "./MealsList.module.css";
import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";

function MealsList() {
  const [mealsList, setMealsList] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchMeals = async () => {
      const res = await fetch(
        "https://food-order-app-bfb89-default-rtdb.asia-southeast1.firebasedatabase.app/meals.json"
      );

      if (!res.ok) {
        throw new Error("Something went wrong!");
      }
      const responseData = await res.json();
      let loadedData = [];
      for (const key in responseData) {
        loadedData.push({
          id: key,
          name: responseData[key].name,
          price: responseData[key].price,
          description: responseData[key].description,
        });
      }
      setMealsList(loadedData);
      setIsLoading(false);
    };

    fetchMeals().catch((error) => {
      setIsLoading(false);
      setError(error.message);
    });
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p> Loading </p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.MealsError}>
        <p>{error}</p>
      </section>
    );
  }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {mealsList.map((meal) => {
            return (
              <MealItem
                key={meal.id}
                id={meal.id}
                name={meal.name}
                description={meal.description}
                price={meal.price}
              />
            );
          })}
        </ul>
      </Card>
    </section>
  );
}

export default MealsList;
