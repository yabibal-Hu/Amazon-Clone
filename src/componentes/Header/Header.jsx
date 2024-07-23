import { useContext } from "react";
import classes from "./Header.module.css";
import { SlLocationPin } from "react-icons/sl";
import { BsSearch } from "react-icons/bs";
import { CiShoppingCart } from "react-icons/ci";
import { Link } from "react-router-dom";
import { DataContext } from "../DataProvider/DataProvider";
import {auth} from "../../Utility/firebase"
import { PulseLoader } from "react-spinners";

function Header() {
  const [state] = useContext(DataContext);
  const totalItems =state.basket?.reduce((amount, item) => amount + item.amount, 0);
  return (
    <section className={classes.header__outer__container}>
      <div className={classes.header__container}>
        <div className={classes.logo__container}>
          {/* logo */}
          <Link to="/">
            <img
              src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
              alt="amazon-logo"
            />
          </Link>
          {/* delivery */}
          <div className={classes.delivery}>
            <span>
              <SlLocationPin />
            </span>
            <div>
              <p style={{ whiteSpace: "nowrap" }}>Delivered to</p>
              <span style={{ fontWeight: "bold" }}>Ethiopia</span>
            </div>
          </div>
        </div>

        <div className={classes.search}>
          <select name="" id="">
            <option value="">All</option>
          </select>
          <input type="text" placeholder="Search..." />
          <BsSearch size={38} />
        </div>
        <div className={classes.order__container}>
          <a href="" className={classes.language}>
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg/1280px-Flag_of_the_United_States_%28DoS_ECA_Color_Standard%29.svg.png"
              alt=""
            />
            <select name="" id="">
              <option value="">EN</option>
            </select>
          </a>
          <Link className={`${classes.border} ${classes.border__signUp}`} to={!state.user && "/auth"}>
            {state.user ? (
              <>
                <p>Hello {state?.user?.email.split("@")[0]}</p>
                <span
                  onClick={() => auth.signOut()}
                  className={classes.order__container__signUp}
                >
                  Sign Out
                </span>
              </>
            ) : (
              <>
                {auth.currentUser ? (
                  <PulseLoader size={10} />
                ) : (
                  <>
                    <p>sign In</p>
                    <span>Account & Lists</span>
                  </>
                )}
              </>
            )}
          </Link>

          <Link className={classes.border} to="/order">
            <p>Returns</p>
            <span>& orders</span>
          </Link>
          <Link to={"/cart"} className={`${classes.cart} ${classes.border}`}>
            <CiShoppingCart size={40} />
            <span>{totalItems}</span>
          </Link>
        </div>
      </div>
    </section>
  );
}

export default Header;
