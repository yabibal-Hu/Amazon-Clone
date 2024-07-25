import { useParams } from "react-router-dom";
import LayOut from "../../componentes/LayOut/LayOut";
import { useEffect, useState } from "react";
import axios from "axios";
import { productUrl } from "../../Api/endPoints";
import ProductCard from "../../componentes/product/ProductCard";
import Loader from "../../componentes/Loader/Loader";
import classes from './ProductDetail.module.css'

function ProductDetail() {
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const { productId } = useParams();
  const [isLargeScreen, setIsLargeScreen] = useState("true"); // Adjust breakpoint as needed

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`${productUrl}/products/${productId}`)
      .then((res) => {
        setProduct(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });

    const handleResize = () => {
      setIsLargeScreen(window.innerWidth > 480 && "false"); // Adjust breakpoint as needed
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <LayOut>
      <div className={classes.product__container}>
        {isLoading ? (
          <Loader />
        ) : (
          <ProductCard
            product={product}
            renderAdd={true}
            flex={isLargeScreen}
          />
        )}
      </div>
    </LayOut>
  );
}

export default ProductDetail;
