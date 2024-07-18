import { useState } from "react";
import { capitalizeFirstLetter } from "../../../utils/arrayHelpers";
import Button from "../../Button/Button";
import Counter from "../../Counter/Counter";
import "./MenuItem.css";
import { ADD_TO_CART } from "../../../constants/buttonConstants";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decrement,
  increment,
  removeItem,
} from "../../../redux/features/cart/cartSlice";

const MenuItem = ({ pizza }) => {
  const { imageUrl, name, ingredients, unitPrice, soldOut, id } = pizza;

  const dispatch = useDispatch();
  const amount = useSelector(
    (store) => store.cart.cartItems.find((item) => item.id === id)?.amount || 0
  );

  const [isClicked, setIsClicked] = useState(false);

  const handleShowCounter = () => {
    dispatch(addToCart(pizza));
    setIsClicked(true);
  };

  const handleDelete = () => {
    dispatch(removeItem(id));
    setIsClicked(false);
  };

  const handleIncrement = () => {
    dispatch(increment({ id }));
  };

  const handleDecrement = () => {
    if (amount > 1) {
      dispatch(decrement({ id }));
    } else {
      handleDelete();
    }
  };

  return (
    <li className="pizza">
      <img
        src={imageUrl}
        className={
          soldOut === false ? "pizza__image" : "pizza__image--sold-out"
        }
      />
      <div className="pizza__info">
        <p className="pizza__name">{name}</p>
        <p className="pizza__ingredients">
          {ingredients.map((item) => capitalizeFirstLetter(item)).join(", ")}
        </p>
        {soldOut === false ? (
          <div className="pizza__actions">
            <p className="pizza__price">€{unitPrice}.00</p>

            {!isClicked ? (
              <Button
                title={ADD_TO_CART}
                handleClick={handleShowCounter}
                className="button"
              />
            ) : (
              <Counter
                counter={amount}
                handleDelete={handleDelete}
                handleIncrement={handleIncrement}
                handleDecrement={handleDecrement}
              />
            )}
          </div>
        ) : (
          <div className="pizza__actions">
            <p className="pizza__price">SOLD OUT</p>
          </div>
        )}
      </div>
    </li>
  );
};

export default MenuItem;
