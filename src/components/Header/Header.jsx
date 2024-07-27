import "./Header.css";
import { Link, useLocation } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import { useRef } from "react";
import Input from "../Input/Input";
import { useDispatch, useSelector } from "react-redux";
import { setPizzaName } from "../../redux/features/products/productsSlice";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const Header = () => {
  const amount = useSelector((store) => store.cart.amount);
  const pizzaName = useSelector((store) => store.products.pizzaName);

  const dispatch = useDispatch();

  const location = useLocation();
  const isMenuPage = location.pathname === "/menu";
  const isLoginPage = location.pathname === "/";
  const isCartPage = location.pathname === "/cart";
  // const isOrderPage = location.pathname === "/order/:id";

  const formRef = useRef();

  const { getItem } = useLocalStorage("userName");

  const handleSubmitForm = (e) => {
    e.preventDefault();
  };

  const handleInputChange = (e) => {
    if (isLoginPage && e.target.value !== "") {
      alert("Please, login whith Your name to search for the order");
      formRef.current.reset();
    } else {
      dispatch(setPizzaName(e.target.value));
    }
  };

  return (
    <header className="header">
      <Link className="logo" to="/">
        Pizza Day
      </Link>
      <form onSubmit={handleSubmitForm} ref={formRef}>
        <Input
          value={pizzaName}
          type="text"
          onChange={handleInputChange}
          placeholder="Search for the order #"
        />
      </form>
      {getItem() !== "" && (isMenuPage || isCartPage) && (
        <div className="cart-box">
          <Link to={"cart"}>
            <TiShoppingCart />
          </Link>
          <p>{amount}</p>
          <h3>{getItem()}</h3>
        </div>
      )}
    </header>
  );
};

export default Header;
