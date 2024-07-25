import { catagoryImages } from "./catagoryAssets";
import CatagoryCards from "./CatagoryCards";
import classes from "./catagory.module.css";

function Catagory() {
  return (
    <section className={`${classes.catagory__container} `}>
      {catagoryImages.map((info) => (
        <CatagoryCards data={info} key={info.name} />
      ))}
    </section>
  );
}

export default Catagory;
