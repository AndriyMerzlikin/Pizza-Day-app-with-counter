import { useDispatch } from "react-redux";
import Counter from "../Counter/Counter";
import "./CartItem.css";
import {
  decrement,
  increment,
  removeItem,
} from "../../redux/features/cart/cartSlice";

const CartItem = ({ item }) => {
  const { name, id, amount, unitPrice } = item;
  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(removeItem(id));
  };

  const handleIncrement = () => {
    dispatch(increment({ id }));
  };

  const handleDecrement = () => {
    if (amount > 1) {
      dispatch(decrement({ id }));
    }
  };

  return (
    <div className="cart-item-box">
      <h3>
        {amount}x{"  "}
        {name}
      </h3>
      <div className="cart-name-price">
        <p>€{amount * unitPrice}.00</p>
        <Counter
          counter={amount}
          handleDelete={handleDelete}
          handleIncrement={handleIncrement}
          handleDecrement={handleDecrement}
        />
      </div>
    </div>
  );
};

export default CartItem;
