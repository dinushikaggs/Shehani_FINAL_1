import React from "react";
import "./Customer.css";
import CustomerForm from "./CustomerForm";
import CustomerTable from "./CustomerTable";
import Sidenav from "../Common/Sidenav";
import Header from "../Common/Heder";

export default function Customer() {
  return (
    <>
      <div className="container">
        <Header />
        <Sidenav userRole="storekeeper" />
        <div className="others">
          <CustomerForm />
          <CustomerTable />
        </div>
      </div>
    </>
  );
}
