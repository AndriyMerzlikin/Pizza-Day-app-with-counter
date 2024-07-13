import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import "./Layout.css";
import { UserProvider } from "../../contexts/UserContext";
import { PizzaNameProvider } from "../../contexts/PizzaNameContext";
import { CounterProvider } from "../../contexts/CounterContext";

const Layout = () => {
  return (
    <div className="wrapper">
      <CounterProvider>
        <PizzaNameProvider>
          <UserProvider>
            <Header />
            <main className="content">
              <Outlet />
            </main>
          </UserProvider>
        </PizzaNameProvider>
      </CounterProvider>
    </div>
  );
};

export default Layout;
