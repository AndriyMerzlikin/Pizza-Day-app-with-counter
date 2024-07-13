import { useEffect } from "react";
import MenuList from "../../components/MenuList/MenuList";
import { usePizzaName } from "../../contexts/PizzaNameContext";
import useFetch from "../../hooks/useFetch";
import Loader from "../../components/Loader/Loader";
import { PIZZA_API } from "../../apis/PizzaApi";

const MenuPage = () => {
  const {
    data: pizzasList,
    setData: setPizzasList,
    isLoading,
    error,
  } = useFetch(PIZZA_API);

  const { pizzaName } = usePizzaName();

  useEffect(() => {
    if (pizzaName) {
      const filteredPizzasList = pizzasList.filter((pizza) =>
        pizza.name.toLowerCase().includes(pizzaName.toLowerCase())
      );
      setPizzasList(filteredPizzasList);
    } else {
      setPizzasList(pizzasList);
    }
  }, [pizzaName, setPizzasList, pizzasList]);

  return (
    <>
      {isLoading && <Loader />}
      {error && <h3>Error: {error}</h3>}
      {pizzasList.length ? <MenuList pizzas={pizzasList} /> : null}
    </>
  );
};

export default MenuPage;
