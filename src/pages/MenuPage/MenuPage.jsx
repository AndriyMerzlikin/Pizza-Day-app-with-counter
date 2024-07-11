import { useEffect, useState } from "react";
import MenuList from "../../components/MenuList/MenuList";
import { pizzas } from "../../data";
import { usePizzaName } from "../../contexts/PizzaNameContext";

const MenuPage = () => {
  const [pizzasList, setPizzasList] = useState([]);
  const { pizzaName } = usePizzaName();

  useEffect(() => {
    if (pizzaName) {
      const filteredPizzasList = pizzas.filter((pizza) =>
        pizza.name.toLowerCase().includes(pizzaName.toLowerCase())
      );
      setPizzasList(filteredPizzasList);
    } else {
      setPizzasList(pizzas);
    }
  }, [pizzaName]);

  return <>{pizzasList.length ? <MenuList pizzas={pizzasList} /> : null}</>;
};

export default MenuPage;
