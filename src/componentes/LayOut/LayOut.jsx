import React from "react";
import Header from "../Header/Header";
import LowerHeader from "../Header/LowerHeader";
import Footer from "../Footer/Footer";

function LayOut({ children }) {
  return (
    <>
      <Header />
      <LowerHeader />
      {children}
      <Footer/>
    </>
  );
}

export default LayOut;
