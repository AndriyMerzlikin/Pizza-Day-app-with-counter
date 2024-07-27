import { useDispatch, useSelector } from "react-redux";
import Button from "../Button/Button";
import "./OrderForm.css";
import { Controller, useForm } from "react-hook-form";
import { boolean, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUser } from "../../contexts/UserContext";
import Input from "../Input/Input";
import { sendOrderData } from "../../redux/features/products/productsSlice";
import { useNavigate } from "react-router-dom";

const schema = z.object({
  name: z.string().trim().min(3, { message: "At least 3 letters" }),
  phone: z
    .string()
    .trim()
    .regex(/^\+\d{3}\s?\d{2}\s?\d{3}\s?\d{4,5}$/, {
      message: "Invalid phone number",
    }),
  email: z.string().trim().email(),
  priority: boolean(),
});

const OrderForm = () => {
  const { userName } = useUser();
  const { cartItems, total } = useSelector((store) => store.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { isValid },
    reset,
  } = useForm({
    mode: "onBlur",
    defaultValues: {
      name: userName,
      phone: "",
      email: "",
      priority: false,
    },
    resolver: zodResolver(schema),
  });

  const handleFormSubmit = async (data) => {
    const orderDataValue = {
      address: data.email,
      customer: data.name,
      phone: data.phone,
      priority: data.priority,
      position: "",
      cart: cartItems.map((item) => ({
        name: item.name,
        pizzaId: item.id,
        quantity: item.amount,
        totalPrice: item.amount * item.unitPrice,
        unitPrice: item.unitPrice,
      })),
      totalPrice: total,
    };

    try {
      const result = await dispatch(sendOrderData(orderDataValue)).unwrap();
      reset();
      if (result.status && result.status === "success") {
        navigate(`/order/${result.data.id}`);
      } else {
        alert("Something went wrong");
      }
    } catch (error) {
      console.error("Failed to send order:", error);
      alert("Something went wrong");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="order-form">
      <div className="input-box">
        <label>First Name</label>
        <Controller
          control={control}
          name="name"
          render={({ field, fieldState }) => (
            <Input
              {...field}
              type="text"
              error={fieldState.error}
              className="input"
            />
          )}
        />
      </div>
      <div className="input-box">
        <label>Phone number</label>
        <Controller
          control={control}
          name="phone"
          render={({ field, fieldState }) => (
            <Input
              {...field}
              type="tel"
              name="phone"
              error={fieldState.error}
              className="input"
              placeholder="+380"
            />
          )}
        />
      </div>
      <div className="input-box">
        <label>Address</label>
        <Controller
          control={control}
          name="email"
          render={({ field, fieldState }) => (
            <Input
              {...field}
              type="email"
              error={fieldState.error}
              className="input"
              placeholder="test@gmail.com"
            />
          )}
        />
      </div>
      <label className="label-check-box">
        <Controller
          control={control}
          name="priority"
          render={({ field }) => <Input {...field} type="checkbox" />}
        />
        Want to You give your order priority?
      </label>
      <Button
        title={`Order now for €${total}.00`}
        className="order-button"
        disabled={!isValid}
      />
    </form>
  );
};

export default OrderForm;
