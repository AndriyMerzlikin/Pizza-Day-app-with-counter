import { useRef } from "react";
import "./LoginPage.css";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import Input from "../../components/Input/Input";
import Button from "../../components/Button/Button";
import { LOGIN } from "../../constants/buttonConstants";

const LoginPage = () => {
  const { userName, setUserName } = useUser();

  const formRef = useRef();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setUserName(e.target.value.toUpperCase());
  };

  const handleSubmitForm = (e) => {
    e.preventDefault();

    if (userName !== "") {
      formRef.current.reset();
      navigate("menu");
    }
  };

  return (
    <>
      <h1 className="title">
        The best pizza.
        <br />
        <span className="text-yellow">
          Straight out of the oven, straight to you.
        </span>
      </h1>
      <p className="sub-title">
        👋 Welcome! Please start by telling us your name:
      </p>
      <form className="login-form" onSubmit={handleSubmitForm} ref={formRef}>
        <Input
          handleType="text"
          handleChange={handleInputChange}
          handlePlaceholder="Your full name"
        />
        <Button className="button-yellow" title={LOGIN} />
      </form>
    </>
  );
};

export default LoginPage;
