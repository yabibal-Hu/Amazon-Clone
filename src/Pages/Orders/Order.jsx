import classes from "./Order.module.css";
import { db } from "../../Utility/firebase";
import LayOut from "../../componentes/LayOut/LayOut";
import { useContext, useEffect, useState } from "react";
import { DataContext } from "../../componentes/DataProvider/DataProvider";
import ProductCard from "../../componentes/product/ProductCard";

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
  return (
    <LayOut>
      <section className={classes.container}>
        <div className={classes.order__container}>
          {orders?.length === 0 ? <h2>No Orders</h2> : <h2>Your Orders</h2>}

          <div>
            {orders?.map((order) => (
              <div className={classes.order} key={order.id}>
                <hr />
                <p>Order Id: {order.id}</p>

                {order.data.basket?.map((item) => (
                  <ProductCard flex={true} key={item.id} product={item} />
                ))}
              </div>
            ))}
          </div>
        </div>
      </section>
    </LayOut>
  );
}

export default Order;
