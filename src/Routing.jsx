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

const stripePromise = loadStripe(
  "pk_test_51Pexf2Rxo6C27obFLkNkSNBPkDnuKSiF3VMKX8pzik5t12nlFf7xsF6RAEtZRaeZsYF4Fz6Z8rN76VufK3cvqG4H00OYUhNVno"
);
function Routing() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/payment"
          element={
            <Elements stripe={stripePromise}>
              <Payment />
            </Elements>
          }
        />
        <Route path="/order" element={<Order />} />
        <Route path="/catagory/:catagoryName" element={<Results />} />
        <Route path="/products/:productId" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  );
}

export default Routing;
