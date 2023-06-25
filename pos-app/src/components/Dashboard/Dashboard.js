import React from "react";
import "./Dashboard.css";

import Sidenav from "../Common/Sidenav";
import Header from "../Common/Heder";

export default function AddUsers() {
  return (
    <>
      <div className="container">
        <Header />
        <h1>Dashboard</h1>
        <Sidenav userRole="storekeeper" />
        <div className="others">{/* <UserForm /> */}</div>
      </div>
    </>
  );
}
