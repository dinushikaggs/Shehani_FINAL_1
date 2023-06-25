import React from "react";
import "./SidenavStyle.css";
import { Navideta } from "./SidenavData";
import logo from "../images/logo.png";
import { MdLogout, MdPerson } from "react-icons/md";

function SideNavi(props) {
  const handleLogout = () => {
    localStorage.removeItem("accessToken"); //clear
    window.location.replace("/login");
  };

  return (
    <div className="sidenavi">
      <>
        <img className="logo" src={logo} alt="Logo" />
      </>

      <ul>
        {props.userRole === "storekeeper" &&
          Navideta.map((val, key) => {
            return (
              <li
                className="but"
                key={key}
                onClick={() => {
                  window.location.pathname = val.link;
                }}
              >
                <div className="icon"> {val.icon} </div>
                <div> {val.title} </div>
              </li>
            );
          })}

        {props.userRole === "user" &&
          Navideta.map((val, key) => {
            return (
              <li
                className="but"
                key={key}
                onClick={() => {
                  window.location.pathname = val.link;
                }}
              >
                <div className="icon"> {val.icon} </div>
                <div> {val.title} </div>
              </li>
            );
          })}

        {props.userRole === "customer" && (
          <li
            className="but"
            onClick={() => {
              // Handle customer specific action
            }}
          >
            <div className="icon">
              <MdPerson />
            </div>
            <div> Customer </div>
          </li>
        )}
      </ul>
      <div className="logodiv">
        <button className="logout" onClick={handleLogout}>
          <MdLogout />
          <span className="butonname"> Logout</span>
        </button>
      </div>
    </div>
  );
}

export default SideNavi;
