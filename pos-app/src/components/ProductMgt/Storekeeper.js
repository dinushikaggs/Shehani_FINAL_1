import React from "react";
import "./Storekeeper.css";
import Sidenav from "../Common/Sidenav";
import Header from "../Common/Heder";

export default function Storekeeper() {
  return (
    <>
      <div className="container">
        <Header />
        <h1>Storekeeper</h1>
        <Sidenav userRole="cashier" />
        <div className="others"></div>
      </div>
    </>
  );
}
