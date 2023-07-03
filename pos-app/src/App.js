import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/UserMgt/Login";
import KeyBoard from "./components/SalesMgt/KeyBoard";
import Checkout from "./components/SalesMgt/Checkout";
import AddUsers from "./components/UserMgt/AddUsers";
// import EditUser from "./components/UserMgt/EditUser";
import ResetPassword from "./components/UserMgt/ResetPassword";
import Storekeeper from "./components/ProductMgt/Storekeeper";
import Customer from "./components/UserMgt/Customer";
import ViewUsers from "./components/UserMgt/ViewUsers";
import Dashboard from "./components/Dashboard/Dashboard";
import Cashier from "./components/SalesMgt/Cashier";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/KeyBoard" element={<KeyBoard />} />
        <Route path="/Checkout" element={<Checkout />} />
        <Route path="/AddUsers" element={<AddUsers />} />
        {/* <Route path="/EditUser/:id" element={<EditUser />} /> */}
        <Route path="/ResetPassword/:id/:token" element={<ResetPassword />} />
        <Route path="/storekeeper" element={<Storekeeper />} />
        <Route path="/Customer" element={<Customer />} />
        <Route path="/ViewUsers" element={<ViewUsers />} />
        <Route path="/Dashboard" element={<Dashboard />} />
        <Route path="/Cashier" element={<Cashier />} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
