import { Route, Routes } from "react-router-dom";
import { lazy } from "react";
import UnAuthrouter from "./UnAuthrouter";

const Home = lazy(() => import("../pages/Home"));
const Explore = lazy(() => import("../pages/Explore"));
const Login = lazy(() => import("../pages/Login"));
const Register = lazy(() => import("../pages/Register"));
const PageNotFound = lazy(() => import("../pages/PageNotFound"));
const CreateProduct = lazy(() => import("../pages/admin/CreateProduct"));
const ProductDetails = lazy(() => import("../pages/admin/ProductDetails"));
const UserProfile = lazy(() => import("../pages/user/UserProfile"));
const Authrouter = lazy(() => import("./Authrouter"));
const Cart = lazy(() => import("../pages/Cart"));

const Mainroutes = () => {
  return (
    <Routes>
      <Route path="*" element={<PageNotFound />} />
      <Route path="/" element={<Home />} />
      <Route path="/products" element={<Explore />} />

      <Route
        path="/admin/create-product"
        element={
          <Authrouter>
            <CreateProduct />
          </Authrouter>
        }
      />
      <Route
        path="/product/:id"
        element={
          <Authrouter>
            <ProductDetails />
          </Authrouter>
        }
      />
      <Route
        path="/register"
        element={
          <UnAuthrouter>
            {" "}
            <Register />{" "}
          </UnAuthrouter>
        }
      />
      <Route
        path="/login"
        element={
          <UnAuthrouter>
            <Login />
          </UnAuthrouter>
        }
      />
      <Route
        path="/profile"
        element={
          <Authrouter>
            <UserProfile />
          </Authrouter>
        }
      />
      <Route
        path="/cart"
        element={
          <Authrouter>
            <Cart />
          </Authrouter>
        }
      />
    </Routes>
  );
};

export default Mainroutes;
