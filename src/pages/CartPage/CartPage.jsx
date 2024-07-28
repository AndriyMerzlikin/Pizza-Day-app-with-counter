import { Link, useNavigate } from "react-router-dom";
import Button from "../../components/Button/Button";
import {
  BACK_TO_MENU,
  CLEAR_CART,
  ORDER_PIZZAS,
} from "../../constants/buttonConstants";
import "./CartPage.css";
import { FaArrowLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../../components/CartItem/CartItem";
import { clearCart } from "../../redux/features/cart/cartSlice";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { useEffect } from "react";

const CartPage = () => {
  const navigate = useNavigate();
  const handleBackToMenu = () => navigate(-1);

  const { amount, cartItems, total } = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  const { setItem } = useLocalStorage("CartItems");

  useEffect(() => {
    setItem(cartItems);
  }, [cartItems, setItem]);

  return (
    <div className="cart">
      <Button
        className="back-btn"
        title={BACK_TO_MENU}
        handleClick={handleBackToMenu}
      >
        <FaArrowLeft />
      </Button>
      {!cartItems.length ? (
        <h2>Your Cart is empty...</h2>
      ) : (
        <div className="main-cart-box">
          <h2>Your Cart, {amount}</h2>
          {cartItems.map((item) => (
            <CartItem key={item.id} item={item} />
          ))}
          <div className="footer-box">
            <hr />
            <div>
              <h4>total €{total}.00</h4>
            </div>
            <div className="footer-btn-box">
              <Link to={"/order/new"}>
                <Button title={ORDER_PIZZAS} className="button" />
              </Link>

              <Button
                className="clear-btn"
                title={CLEAR_CART}
                handleClick={() => dispatch(clearCart())}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;
