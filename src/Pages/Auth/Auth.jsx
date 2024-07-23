// import LayOut from "../../componentes/LayOut/LayOut";

import { Link, useNavigate, useLocation } from "react-router-dom";
import classes from "./Signup.module.css";
import { useState, useContext } from "react";
import { auth } from "../../Utility/firebase";
import { DataContext } from "../../componentes/DataProvider/DataProvider";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { Type } from "../../Utility/action.type";
import { PulseLoader } from "react-spinners";

function Auth() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [{ user }, dispatch] = useContext(DataContext);
  const [loading, setLoading] = useState({ signIn: false, signUp: false });

  const navigate = useNavigate();
  const navStateData = useLocation();
  // console.log(navStateData.state.msg)
  // const message = navStateData.state.msg;
  const authHandler = async (e) => {
    dispatch({
      type: Type.SET_USER,
      user: null,
    });

    setLoading({ ...loading, signIn: true });
    e.preventDefault();
    console.log(e.target.name);

    if (e.target.name == "signIn") {
      signInWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signIn: false });
          // console.log(user);
          navigate(navStateData?.state?.redirect || "/");
        })
        .catch((err) => {
          setError(err.message);
          setLoading({ ...loading, signIn: false });
        });
      setError("");
    } else {
      setLoading({ ...loading, signUp: true });
      createUserWithEmailAndPassword(auth, email, password)
        .then((userInfo) => {
          dispatch({
            type: Type.SET_USER,
            user: userInfo.user,
          });
          setLoading({ ...loading, signUp: false });

          // navigate("/");
        })
        .catch((err) => {
          console.log(err);
          setLoading({ ...loading, signUp: false });
          setError(err.message);
        });
      setError("");
    }
  };
  return (
    <section className={classes.login}>
      <Link to={"/"}>
        <img
          src="https://pngimg.com/uploads/amazon/amazon_PNG1.png"
          alt="amazon-logo"
        />
      </Link>
      <div className={classes.login__container}>
        {/* {navStateData?.state?.msg} */}
        <h1>Sign In / Sign Up</h1>
        <p
          style={{
            padding: "5px",
            textAlign: "center",
            color: "red",
            fontWeight: "bold",
          }}
        >
          {navStateData?.state?.msg}
        </p>
        <form action="">
          <div>
            <label htmlFor="email">Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              id="email"
            />
          </div>

          <div>
            <label htmlFor="pasword">Pasword</label>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="pasword"
              id="pasword"
            />
          </div>

          <button
            type="submit"
            name="signIn"
            onClick={authHandler}
            className={classes.login__signInButton}
          >
            {loading.signIn ? <PulseLoader size={10} /> : "Sign In"}
          </button>
        </form>

        <p>
          By signing-in you agree to the AMAZON FAKE CLONE conditions of Use &
          Sale.Please see our Privacy Notice, our Cookies Notice and our
          Interest-Based Ads Notice.
        </p>
        <button
          type="submit"
          name="signUp"
          onClick={authHandler}
          className={classes.login__registerButton}
        >
          {loading.signUp ? (
            <PulseLoader size={10} />
          ) : (
            "Create your Amazon Account"
          )}
        </button>
        {error && (
          <>
            <small style={{ paddingTop: "5px", color: "red" }}>{error}</small>
          </>
        )}
        <small style={{ paddingTop: "10px", color: "green" }}>
          {user && (
            <>
              {"account successfully created!!"}
              <br />
              {"now you can login"}
            </>
          )}
        </small>
      </div>
    </section>
  );
}

export default Auth;
