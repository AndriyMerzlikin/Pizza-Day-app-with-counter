import { DECREMENT, DELETE, INCREMENT } from "../../constants/buttonConstants";
import Button from "../Button/Button";
import "./Counter.css";

const Counter = ({
  counter,
  handleDelete,
  handleIncrement,
  handleDecrement,
}) => {
  return (
    <div className="counter-container">
      <div className="counter-box">
        <Button
          title={INCREMENT}
          handleClick={handleIncrement}
          className="button"
        />
        <p>{counter}</p>
        <Button
          title={DECREMENT}
          handleClick={handleDecrement}
          className="button"
        />
      </div>

      <Button title={DELETE} handleClick={handleDelete} className="button" />
    </div>
  );
};

export default Counter;
