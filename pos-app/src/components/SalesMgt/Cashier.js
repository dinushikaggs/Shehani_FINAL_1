import React from "react";
import "./Cashier.css";

import Sidenav from "../Common/Sidenav";
import Header from "../Common/Heder";

export default function Cashier() {
  return (
    <>
      <div className="container">
        <Header />
        <h1>Cashier</h1>
        <Sidenav userRole="cashier" />
        <div className="others"></div>
      </div>
    </>
  );
}
