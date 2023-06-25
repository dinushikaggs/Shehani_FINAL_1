import axios from "axios";
import React, { useState, useEffect } from "react";
import { FiMessageSquare } from "react-icons/fi";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { IconContext } from "react-icons";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import jwtDecode from "jwt-decode";
import "./HederStyle.css";

function Heder() {
  // state variables
  const [showForm, setShowForm] = useState(false);
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [decodedToken, setDecodedToken] = useState(null);

  useEffect(() => {
    // useEffect fetch data from an API when the component mounts or when a certain dependency changes
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setDecodedToken(jwtDecode(accessToken));
    }
  }, []);

  console.log(decodedToken);

  const handleProfileClick = () => {
    //profile button
    setShowForm(true);
  };

  const handleModalClose = () => {
    // modal close button
    setShowForm(false);
    setErrorMessage("");
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    if (newPassword !== confirmPassword) {
      alert("New password and confirm password should be the same");
      return;
    }

    try {
      const response = await axios.post(
        `http://localhost:3001/users/changePassword/${decodedToken.result.id}`,
        {
          password: newPassword,
        }
      );

      console.log(response.data);

      if (response.data.error) {
        setErrorMessage(response.data.error);
      } else {
        alert(response.data);
        setShowForm(false);
        setNewPassword("");
        setConfirmPassword("");
        setEmail("");
        setErrorMessage("");
      }
    } catch (error) {
      console.log(error);
      setErrorMessage("Failed to update password");
    }
  };

  const handleClearForm = () => {
    setNewPassword("");
    setConfirmPassword("");
    setEmail("");
    setErrorMessage("");
  };

  return (
    <div className="Topbar">
      <div className="topWrapper">
        <div>
          <h1 className="syname">BY TECH POS SYSTEM</h1>
          <h4 className="interfacename">Header Interface</h4>{" "}
        </div>
        <div className="notification">
          <IconContext.Provider value={{ size: "1.5rem", color: "white" }}>
            <div className="ntf">
              <FiMessageSquare />
            </div>
            <div className="ntf">
              <IoMdNotificationsOutline />
            </div>
            <button className="ntf" onClick={handleProfileClick}>
              {/* icon name */}
              <CgProfile />
            </button>
          </IconContext.Provider>
        </div>
      </div>

      <Modal show={showForm} onHide={handleModalClose} className="custom-modal">
        <Modal.Header closeButton>
          <Modal.Title style={{ color: "darkblue" }}>
            {decodedToken && decodedToken.result.full_name}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleFormSubmit}>
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
            {/* <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group> */}
            <Form.Group controlId="newPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="confirmPassword">
              <Form.Label>Confirm Password</Form.Label>
              <Form.Control
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </Form.Group>
            <div className="form-buttons d-flex justify-content-end">
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
              <Button variant="secondary" onClick={handleClearForm}>
                Clear
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Heder;
