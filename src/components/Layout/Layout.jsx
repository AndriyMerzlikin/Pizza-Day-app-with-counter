import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import "./Layout.css";
import { UserProvider } from "../../contexts/UserContext";
import { PizzaNameProvider } from "../../contexts/PizzaNameContext";

const Layout = () => {
  return (
    <div className="wrapper">
      <PizzaNameProvider>
        <UserProvider>
          <Header />
          <main className="content">
            <Outlet />
          </main>
        </UserProvider>
      </PizzaNameProvider>
    </div>
  );
};

export default Layout;
