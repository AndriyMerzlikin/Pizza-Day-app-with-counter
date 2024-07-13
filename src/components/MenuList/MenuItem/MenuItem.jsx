import { useState } from "react";
import { capitalizeFirstLetter } from "../../../utils/arrayHelpers";
import Button from "../../Button/Button";
import Counter from "../../Counter/Counter";
import "./MenuItem.css";
import { ADD_TO_CART } from "../../../constants/buttonConstants";

const MenuItem = ({ pizza }) => {
  const { imageUrl, name, ingredients, unitPrice, soldOut } = pizza;

  const [isClicked, setIsClicked] = useState(false);
  const [counter, setCounter] = useState(0);

  const handleShowCounter = () => {
    setIsClicked(true);
  };

  const handleIncrement = () => {
    setCounter((prevState) => prevState + 1);
  };

  const handleDecrement = () => {
    if (counter > 0) {
      setCounter((prevState) => prevState - 1);
    }
  };

  const handleDeleteOrder = () => {
    setIsClicked(false);
    setCounter(0);
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
                counter={counter}
                handleDelete={handleDeleteOrder}
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
