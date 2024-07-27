import { Route, Routes } from "react-router-dom";
import Layout from "./components/Layout/Layout";
import { lazy } from "react";

const LoginPage = lazy(() => import("./pages/LoginPage/LoginPage"));
const MenuPage = lazy(() => import("./pages/MenuPage/MenuPage"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage/NotFoundPage"));
const CartPage = lazy(() => import("./pages/CartPage/CartPage"));
const OrderFormPage = lazy(() => import("./pages/OrderFormPage/OrderFormPage"));
const OrderPage = lazy(() => import("./pages/OrderPage/OrderPage"));

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<LoginPage />} />
          <Route path="menu" element={<MenuPage />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="order/new" element={<OrderFormPage />} />
          <Route path="order/:id" element={<OrderPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
