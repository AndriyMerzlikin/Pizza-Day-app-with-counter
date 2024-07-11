import { Link, useLocation } from "react-router-dom";
import { useUser } from "../../contexts/UserContext";
import "./Header.css";
import { usePizzaName } from "../../contexts/PizzaNameContext";
import { useRef } from "react";
import Input from "../Input/Input";

const Header = () => {
  const { userName } = useUser();
  const { setPizzaName } = usePizzaName();

  const location = useLocation();
  const isMenuPage = location.pathname === "/menu";
  const isLoginPage = location.pathname === "/";

  const formRef = useRef();

  const handleSubmitForm = (e) => {
    e.preventDefault();
    // formRef.current.reset();
  };

  const handleInputChange = (e) => {
    if (isLoginPage && e.target.value !== "") {
      alert("Please, login whith Your name to search for the order");
      formRef.current.reset();
    }
    setPizzaName(e.target.value);
  };

  return (
    <header className="header">
      <Link className="logo" to="/">
        Pizza Day
      </Link>
      <form onSubmit={handleSubmitForm} ref={formRef}>
        <Input
          handleType="text"
          handleChange={handleInputChange}
          handlePlaceholder="Search for the order #"
        />
      </form>
      {userName !== "" && isMenuPage && <h3>{userName}</h3>}
    </header>
  );
};

export default Header;
