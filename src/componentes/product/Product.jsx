import { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";
import classes from "./product.module.css";
import Loader from "../Loader/Loader";

function Product() {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  useEffect(() => {
    setIsLoading(true);
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false)
      })

      .catch((err) => {
        console.log(err)
        setIsLoading(false)
      })
  }, []);
  // console.log(product);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <section className={classes.product__container}>
          {product?.map((singleProduct) => (
            // console.log(singleProduct),
            <ProductCard
              product={singleProduct}
              key={singleProduct.id}
              renderAdd={true}
            />
          ))}
        </section>
      )}
    </>
  );
}
export default Product;
