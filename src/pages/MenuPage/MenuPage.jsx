import { useEffect } from "react";
import MenuList from "../../components/MenuList/MenuList";
import Loader from "../../components/Loader/Loader";
import { useDispatch, useSelector } from "react-redux";
import { filterPizzasList } from "../../redux/features/products/productsSlice";

const MenuPage = () => {
  const { isLoading, error, pizzaName, filteredPizzasList } = useSelector(
    (store) => store.products
  );

  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getProductItems());
  // }, [dispatch]);

  useEffect(() => {
    dispatch(filterPizzasList());
  }, [pizzaName, dispatch]);

  return (
    <>
      {isLoading && <Loader />}
      {error && <h3>Error: {error}</h3>}
      {filteredPizzasList.length ? (
        <MenuList pizzas={filteredPizzasList} />
      ) : null}
    </>
  );
};

export default MenuPage;

// import { useEffect, useState } from "react";
// import MenuList from "../../components/MenuList/MenuList";
// import { usePizzaName } from "../../contexts/PizzaNameContext";
// import useFetch from "../../hooks/useFetch";
// import Loader from "../../components/Loader/Loader";
// import { PIZZA_API } from "../../apis/PizzaApi";

// const MenuPage = () => {
//   const { data: allPizzas, isLoading, error } = useFetch(PIZZA_API);
//   const [filteredPizzasList, setFilteredPizzasList] = useState([]);
//   const { pizzaName } = usePizzaName();

//   useEffect(() => {
//     if (pizzaName) {
//       const filteredPizzas = allPizzas.filter((pizza) =>
//         pizza.name.toLowerCase().includes(pizzaName.toLowerCase())
//       );
//       setFilteredPizzasList(filteredPizzas);
//     } else {
//       setFilteredPizzasList(allPizzas);
//     }
//   }, [pizzaName, allPizzas]);

//   return (
//     <>
//       {isLoading && <Loader />}
//       {error && <h3>Error: {error}</h3>}
//       {filteredPizzasList.length ? (
//         <MenuList pizzas={filteredPizzasList} />
//       ) : null}
//     </>
//   );
// };

// export default MenuPage;
