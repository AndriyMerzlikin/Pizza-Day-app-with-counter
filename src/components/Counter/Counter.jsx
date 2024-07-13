// import { useCounter } from "../../contexts/CounterContext";
import { DECREMENT, DELETE, INCREMENT } from "../../constants/buttonConstants";
import Button from "../Button/Button";
import "./Counter.css";

const Counter = ({
  counter,
  handleDelete,
  handleIncrement,
  handleDecrement,
}) => {
  //   const { state, handleIncrement, handleDecrement } = useCounter();

  return (
    <div className="counter-container">
      <div className="counter-box">
        <Button title={INCREMENT} handleClick={handleIncrement} />
        <p>{counter}</p>
        <Button title={DECREMENT} handleClick={handleDecrement} />
      </div>

      <Button title={DELETE} handleClick={handleDelete} />
    </div>
  );
};

export default Counter;
