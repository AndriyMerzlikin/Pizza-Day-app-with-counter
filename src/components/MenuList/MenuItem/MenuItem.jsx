/* eslint-disable react/prop-types */
import { capitalizeFirstLetter } from "../../../utils/arrayHelpers";
import Button from "../../Button/Button";
import "./MenuItem.css";

const MenuItem = ({ pizza }) => {
  const { imageUrl, name, ingredients, unitPrice, soldOut } = pizza;

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
            <Button
              title={"ADD TO CART"}
              handleClick={() => console.log("Added to cart")}
              className="button"
            />
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
