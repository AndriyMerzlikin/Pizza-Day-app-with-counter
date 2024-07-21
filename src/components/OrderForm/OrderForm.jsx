import { useSelector } from "react-redux";
import Button from "../Button/Button";
import "./OrderForm.css";
import { useUser } from "../../contexts/UserContext";
import { useEffect, useRef, useState } from "react";
import { capitalizeFirstLetter } from "../../utils/arrayHelpers";

const OrderForm = () => {
  const [orderForm, setOrderForm] = useState({
    name: "",
    phone: "",
    email: "",
    priority: false,
  });

  const [formErrors, setFormErrors] = useState({
    name: "",
    phone: "",
    email: "",
  });

  const { userName } = useUser();
  const total = useSelector((store) => store.cart.total);

  const formRef = useRef();

  useEffect(() => {
    if (userName) {
      setOrderForm((prev) => ({
        ...prev,
        name: capitalizeFirstLetter(userName),
      }));
    }
  }, [userName]);

  const handleSubmitForm = (e) => {
    e.preventDefault();
    handleResetForm();
    const capitalizedForm = {
      ...orderForm,
      name: capitalizeFirstLetter(orderForm.name),
    };

    console.log(capitalizedForm);
  };

  const handleResetForm = () => {
    setOrderForm({ name: "", phone: "", email: "", priority: false });
    formRef.current.reset();
  };

  const handleCheckedInput = (e) => {
    setOrderForm((prev) => ({ ...prev, priority: e.target.checked }));
  };

  const handleChangeInputValue = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      
      if (/^\d*$/.test(value)) {
        setOrderForm((prev) => ({ ...prev, [name]: value }));
      }
    } else {
      setOrderForm((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleValidateName = () => {
    if (orderForm.name.trim() === "") {
      setFormErrors((prev) => ({ ...prev, name: "Empty field" }));
    } else if (orderForm.name.trim().length < 3) {
      setFormErrors((prev) => ({
        ...prev,
        name: "Min 3 letters",
      }));
    } else {
      setFormErrors((prev) => ({
        ...prev,
        name: "",
      }));
    }
  };

  const handleValidatePhone = () => {
    if (orderForm.phone.trim() === "") {
      setFormErrors((prev) => ({ ...prev, phone: "Empty field" }));
    } else if (orderForm.phone.trim().length !== 8) {
      setFormErrors((prev) => ({
        ...prev,
        phone: "Must be exactly 8 numbers",
      }));
    } else {
      setFormErrors((prev) => ({
        ...prev,
        phone: "",
      }));
    }
  };

  const handleValidateEmail = () => {
    if (orderForm.email.trim() === "") {
      setFormErrors((prev) => ({ ...prev, email: "Empty field" }));
    } else {
      setFormErrors((prev) => ({
        ...prev,
        email: "",
      }));
    }
  };

  const isButtonDisabled =
    orderForm.name.trim() === "" ||
    orderForm.phone.trim() === "" ||
    orderForm.email.trim() === "" ||
    formErrors.name ||
    formErrors.phone ||
    formErrors.email;

  return (
    <form className="order-form" onSubmit={handleSubmitForm} ref={formRef}>
      <div className="input-box">
        <label>First Name</label>
        <input
          type="text"
          className="input"
          name="name"
          value={orderForm.name}
          onChange={handleChangeInputValue}
          onBlur={handleValidateName}
          required
        />
      </div>
      {formErrors.name && <p className="error-message">{formErrors.name}</p>}
      <div className="input-box">
        <label>Phone number</label>
        <input
          type="tel"
          className="input"
          name="phone"
          value={orderForm.phone}
          onChange={handleChangeInputValue}
          onBlur={handleValidatePhone}
          required
        />
      </div>
      {formErrors.phone && <p className="error-message">{formErrors.phone}</p>}
      <div className="input-box">
        <label>Address</label>
        <input
          type="email"
          className="input"
          name="email"
          defaultValue={orderForm.address}
          onChange={handleChangeInputValue}
          onBlur={handleValidateEmail}
          required
        />
      </div>
      {formErrors.email && <p className="error-message">{formErrors.email}</p>}

      <label className="label-check-box">
        <input
          type="checkbox"
          checked={orderForm.priority}
          onChange={handleCheckedInput}
        />
        Want to You give your order priority?
      </label>
      <Button
        title={`Order now for €${total}.00`}
        className={"order-button"}
        disabled={isButtonDisabled}
      />
    </form>
  );
};

export default OrderForm;
