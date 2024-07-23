import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Payment from "./Pages/Payment/Payment.jsx";
import Cart from "./Pages/Cart/Cart.jsx";
import Order from "./Pages/Orders/Order.jsx";
import Landing from "./Pages/Landing/Landing.jsx";
import Results from "./Pages/Results/Results.jsx";
import ProductDetail from "./Pages/ProductDetail/ProductDetail.jsx";
import Auth from "./Pages/Auth/Auth.jsx";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import ProtectedRoute from "./componentes/ProtectedRoute/ProtectedRoute.jsx";

// const stripePromise = loadStripe(import.meta.env.VITE_FIREBASE_API_KEY);
const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);
function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/payment"
          element={
            <ProtectedRoute
              redirect={"/payment"}
              msg={"you must log in to see your payment"}
            >
              <Elements stripe={stripePromise}>
                <Payment />
              </Elements>
            </ProtectedRoute>
          }
        />
        <Route
          path="/order"
          element={
            <ProtectedRoute
              redirect={"/order"}
              msg={"you must log in to see your order"}
            >
              <Order />
            </ProtectedRoute>
          }
        />
        <Route path="/catagory/:catagoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;
