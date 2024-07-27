import { useSelector } from "react-redux";
import moment from "moment";
import "./OrderPage.css";
import { useEffect, useMemo, useState } from "react";

const OrderPage = () => {
  const {
    id,
    cart,
    estimatedDelivery,
    orderPrice,
    priority,
    priorityPrice,
    status,
  } = useSelector((store) => store.products.orderData.data);

  const formatDate = (isoDate) => {
    return moment(isoDate).format("MMM DD, hh:mm a");
  };

  const timeRemaining = (isoDate) => {
    const now = moment();
    const endDate = moment(isoDate);
    const duration = moment.duration(endDate.diff(now));
    const minutes = Math.floor(duration.minutes());
    return `${minutes} minutes`;
  };

  const estimatedDate = formatDate(estimatedDelivery);

  const [leftTime, setLeftTime] = useState(timeRemaining(estimatedDelivery));

  useEffect(() => {
    const intervalId = setInterval(() => {
      setLeftTime(timeRemaining(estimatedDelivery));
      if (moment(estimatedDelivery).isBefore(moment())) {
        clearInterval(intervalId);
      }
    }, 60000);
    return () => clearInterval(intervalId);
  }, [estimatedDelivery]);

  const payOnDelivery = useMemo(() => {
    return orderPrice + (priority ? priorityPrice : 0);
  }, [orderPrice, priority, priorityPrice]);

  return (
    <div className="order-ctnr">
      <div className="status-box">
        <h3>
          Order #{id} status: {status}
        </h3>
        <div className="status-text">
          {priority && <div className="priority-box">PRIORITY</div>}
          <div className="preparing-box">PREPARING ORDER</div>
        </div>
      </div>

      <div className="date-box">
        <h4>Only {leftTime} left &#128515;</h4>
        <p>(Estimated delivery: {estimatedDate})</p>
      </div>

      <ul className="order-list">
        {cart.map(({ pizzaId, quantity, name, totalPrice }) => (
          <li key={pizzaId}>
            <p>
              {quantity}× <span>{name}</span>
            </p>
            <p>€{totalPrice}.00</p>
          </li>
        ))}
      </ul>

      <div className="pay-box">
        <p>Price pizza: €{orderPrice}.00</p>
        {priority && <p>Price priority: €{priorityPrice}.00</p>}
        <p>To pay on delivery: €{payOnDelivery}.00</p>
      </div>
    </div>
  );
};

export default OrderPage;
