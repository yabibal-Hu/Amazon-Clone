import { useContext, useState } from "react";
import classes from "./Payment.module.css";
import LayOut from "../../componentes/LayOut/LayOut";
import { DataContext } from "../../componentes/DataProvider/DataProvider";
import ProductCard from "../../componentes/product/ProductCard";
import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import CurrencyFormater from "../../componentes/currencyFormat/CurrencyFormat";

// console.log(state);
function Payment() {
  const [{ user, basket }, dispatch] = useContext(DataContext);

  const totalItems = basket?.reduce((amount, item) => amount + item.amount, 0);

  const stripe = useStripe();
  const elements = useElements();
  const [error, setError] = useState(null);
  const handleChange = (e) =>
    e?.error?.message ? setError(e.error.message) : setError(null);
  const totalPrice = basket.reduce((ammount, item) => {
    return item.price * item.amount + ammount;
  }, 0);
  return (
    <LayOut>
      <div className={classes.payment__header}>
        Checout ({totalItems}) items
      </div>
      <section className={classes.payment}>
        <div className={classes.flex}>
          <h3>Delivery Address</h3>
          <div>
            <div>{user?.email}</div>
            <div>abcd way</div>
            <div>usa</div>
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
              <form action="">
                <small style={{ color: "red" }}>{error}</small>
                <CardElement onChange={handleChange} />
                <div className={classes.payment__price}>
                  <div>
                  <span style={{ display: "flex",gap:"10px" }}>
                      Total Order | <CurrencyFormater amount={totalPrice} />{" "}
                    </span>
                  </div>
                  <button>Pay Now</button>
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
