import { useContext, useState } from "react";
import classes from "./Payment.module.css";
import LayOut from "../../componentes/LayOut/LayOut";
import { DataContext } from "../../componentes/DataProvider/DataProvider";
import ProductCard from "../../componentes/product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormater from "../../componentes/currencyFormat/CurrencyFormat";
import { axiosInstance } from "../../Api/axios";
import { PulseLoader } from "react-spinners";
import { db } from "../../Utility/firebase";
import { useNavigate } from "react-router-dom";
import { Type } from "../../Utility/action.type";

function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);
  const navigate = useNavigate();
  const totalItems = basket?.reduce((amount, item) => amount + item.amount, 0);
  const totalPrice = basket.reduce(
    (amount, item) => item.price * item.amount + amount,
    0
  );

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setLoading(false);
    if (e?.error) {
      setError(e.error.message);
    } else {
      setError(null);
    }
  };

  const handlePayment = async (e) => {
    e.preventDefault();
    setLoading(true);

    

    try {
      const response = await axiosInstance.post(
        `/payment/create?total=${totalPrice * 100}`
      );
      const clientSecret = response.data.clientSecret;

      const paymentResult = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        },
      });

      const paymentIntent = paymentResult.paymentIntent;

      console.log(paymentIntent);

      if (paymentResult.error) {
        setError(`Payment failed: ${paymentResult.error.message}`);
      } 
      
      try {
        await db
          .collection("users")
          .doc(user.uid)
          .collection("orders")
          .doc(paymentIntent.id)
          .set({
            basket: basket,
            amount: paymentIntent.amount,
            created: paymentIntent.created,
          });

        dispatch({
          type: Type.EMPTY_BASKET,
        });

        navigate("/order", { state: { msg: "You have placed a new order" } });
      } catch (error) {
        console.error("Error adding order: ", error);
      }
    } catch (err) {
      setError(`Payment failed: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayOut>
      <div className={classes.payment__header}>
        Checkout ({totalItems}) items
      </div>
      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>abcd way</div>
            <div>USA</div>
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Review items and delivery</h3>
          <div>
            {basket?.map((item, i) => (
              <ProductCard key={i} product={item} flex={true} />
            ))}
          </div>
        </div>
        <hr />
        <div className={classes.flex}>
          <h3>Payment Method</h3>
          <div className={classes.payment__card__container}>
            <div className={classes.payment__card__details}>
              <form onSubmit={handlePayment}>
                <>
                  {error && <small style={{ color: "red" }}>{error}</small>}
                  {/* {succeeded && (
                    <small style={{ color: "green" }}>{succeeded}</small>
                  )} */}
                </>
                <CardElement onChange={handleChange} />
                <div className={classes.payment__price}>
                  <div>
                    <span style={{ display: "flex", gap: "10px" }}>
                      Total Order | <CurrencyFormater amount={totalPrice} />
                    </span>
                  </div>
                  <button type="submit" disabled={loading}>
                    {loading ? (
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          gap: "15px",
                        }}
                      >
                        <PulseLoader size={8} color="green" />{" "}
                        <p>Please wait...</p>
                      </div>
                    ) :(
                      <b>Pay Now</b>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Payment;
