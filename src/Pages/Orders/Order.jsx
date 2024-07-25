import classes from "./Order.module.css";
import { db } from "../../Utility/firebase";
import LayOut from "../../componentes/LayOut/LayOut";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../componentes/DataProvider/DataProvider";
import ProductCard from "../../componentes/product/ProductCard";
import Stack from "react-bootstrap/Stack";


function Order() {
  const [{ user }, dispatch] = useContext(DataContext);
  const [orders, setOrders] = useState([]);
  // console.log(user)
  useEffect(() => {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .collection("orders")
        .orderBy("created", "desc")
        .onSnapshot((snapshot) => {
          // console.log(snapshot);
          setOrders(
            snapshot.docs.map((doc) => ({
              id: doc.id,
              data: doc.data(),
            }))
          );
        });
    } else {
      setOrders([]);
    }
  }, []);
  const formatDate = (date) => {
    const firebaseTimestamp = date;
    const dateInMilliseconds = firebaseTimestamp * 1000;
    const dateObject = new Date(dateInMilliseconds);
    const formattedDate = dateObject.toLocaleString();
    return formattedDate;
  };
  const formatPrice = (price) => {
    const formattedPrice = (price / 100).toLocaleString("en-US", {
      style: "currency",
      currency: "USD",
    });
    return formattedPrice;
  };

  const amountInCents = 8694;

  const amountInDollars = amountInCents / 100;

  const formattedPrice = amountInDollars.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
  });
  function VerticalExample() {
    return (
      <Stack gap={3}>
        <div className="p-2">First item</div>
        <div className="p-2">Second item</div>
        <div className="p-2">Third item</div>
      </Stack>
    );
  }

  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.order__container}>
          {orders?.length === 0 ? <h2>No Orders</h2> : <h2>Your Orders</h2>}

          <div className={classes.order__content}>
            {orders?.map((order) => (
              <div className={classes.order} key={order.id}>
                <hr />
                <div className={classes.order__info__wrapper}>
                  <div className={classes.order__info}>
                    <p>Order Id: {order.id}</p>
                    <p>Order Date: {formatDate(order.data.created)}</p>
                    <p>Order Price: ${formatPrice(order.data.amount)}</p>
                  </div>
                  <div className={classes.order__wrapper}>
                    {order.data.basket?.map((item) => (
                      <ProductCard flex={true} key={item.id} product={item} />
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Order;
