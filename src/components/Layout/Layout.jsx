import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import "./Layout.css";
import { UserProvider } from "../../contexts/UserContext";
import { PizzaNameProvider } from "../../contexts/PizzaNameContext";
import { CounterProvider } from "../../contexts/CounterContext";
import { useDispatch, useSelector } from "react-redux";
import { Suspense, useEffect } from "react";
import { calculateTotals } from "../../redux/features/cart/cartSlice";

const Layout = () => {
  const cartItems = useSelector((store) => store.cart);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(calculateTotals());
  }, [cartItems, dispatch]);

  return (
    <div className="wrapper">
      <CounterProvider>
        <PizzaNameProvider>
          <UserProvider>
            <Header />
            <Suspense fallback={null}>
              <main className="content">
                <Outlet />
              </main>
            </Suspense>
          </UserProvider>
        </PizzaNameProvider>
      </CounterProvider>
    </div>
  );
};

export default Layout;
