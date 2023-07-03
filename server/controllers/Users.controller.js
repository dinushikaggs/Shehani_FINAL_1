const { Users } = require("../models");
const { sign } = require("jsonwebtoken");
var nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
require("dotenv").config();
const keysecret = process.env.SECRET;

const logIn = async (req, res) => {
  try {
    const user = await Users.findOne({
      where: { email: req.body.email },
    });

    if (!user) {
      return res.status(404).json({
        success: 0,
        message: "User Not Found",
      });
    }

    const isPasswordValid = await bcrypt.compare(
      req.body.user_password,
      user.user_password
    );

    if (isPasswordValid) {
      user.user_password = undefined;
      // Generate token
      const token = sign({ result: user }, "pos@1234", {
        expiresIn: "3h",
      });
      // Respond with token and user data
      return res.status(200).json({
        success: 1,
        token: token,
        results: user,
      });
    } else {
      return res.status(401).json({
        success: 0,
        message: "Invalid email or password",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred" });
  }
};

const register = async (req, res) => {
  //form
  try {
    const { full_name, address, email, mobile_no, user_password } = req.body;
    let { user_role } = req.body;
    if (
      user_role !== "cashier" &&
      user_role !== "storekeeper" &&
      user_role !== "admin"
    ) {
      return res.status(400).json({ error: "Invalid user role" });
    }
    // Check if email already exists
    const existingUser = await Users.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ error: "Email already exists" });
    }

    const existingMobileNo = await Users.findOne({ where: { mobile_no } });
    if (existingMobileNo) {
      return res.status(400).json({ error: "Mobile no already exists" });
    }

    // Encrypt the password
    const encryptedPassword = await bcrypt.hash(user_password, 10);

    // Create the user in the database
    const user = await Users.create({
      full_name,
      address,
      email,
      mobile_no,
      user_role,
      user_password: encryptedPassword, // Store the encrypted password
    });

    sendEmail(email, user_password, user.id);
    console.log(user.id);
    // Pass the user ID to sendEmail function
    return res
      .status(200)
      .json({ message: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "An error occurred" });
  }
};

const sendEmail = async (toEmail, password, userId) => {
  try {
    const token = jwt.sign({ userId }, process.env.SECRET, {
      expiresIn: "1d",
    });

    const resetPasswordLink = `http://localhost:3000/ResetPassword/${userId}/${token}`;

    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: "bypossystem@gmail.com",
        pass: "csabgabycahctngl",
      },
    });

    const mailOptions = {
      from: "bypossystem@gmail.com",
      to: toEmail,
      subject: "Account Created",
      text: `Your account has been created.
      Email: ${toEmail}
      Password: ${password}
      Reset Password Link: ${resetPasswordLink}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        // Handle the error here, such as logging it or returning an error response
      } else {
        console.log("Email sent:", info.response);
        // Handle the success case here, such as logging it or returning a success response
      }
    });
  } catch (error) {
    console.log("Error sending email:", error);
    // Handle the error here, such as logging it or returning an error response
  }
};

const resetPassword = async (req, res) => {
  const { id, token } = req.params; // Retrieve id and token from request parameters
  const { new_password } = req.body; // Retrieve password from request body

  console.log(id, token);
  console.log(new_password);

  try {
    const verifyToken = jwt.verify(token, process.env.SECRET);
    console.log(verifyToken);
    const validUser = await Users.findOne({
      where: { id: verifyToken.userId },
    });
    console.log(validUser);
    if (validUser && verifyToken.userId) {
      const hashedPassword = await bcrypt.hash(new_password, 12);
      validUser.user_password = hashedPassword;
      await validUser.save();
      res.status(200).json({
        message: "Password updated successfully",
        hashedPassword: hashedPassword,
      });
    } else {
      res.status(401).json({ message: "Invalid user or token" });
    }
  } catch (error) {
    res.status(500).json({ error: "An error occurred" });
  }
};
const forgotPassword = async (req, res) => {
  const user = await Users.findOne({
    where: { email: req.params.email },
  });

  if (!user) {
    return res.status(404).json({ error: "Email not registered" });
  }

  const userId = user.id;
  const token = jwt.sign({ userId }, process.env.SECRET, {
    expiresIn: "1d",
  });
  const resetPasswordLink = `http://localhost:3000/ResetPassword/${userId}/${token}`;

  const transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: "bypossystem@gmail.com",
      pass: "csabgabycahctngl",
    },
  });

  const mailOptions = {
    from: "bypossystem@gmail.com",
    to: req.params.email,
    subject: "Reset Password",
    text: `Please reset your password.
    Reset Password Link: ${resetPasswordLink}`,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error("Error sending email:", error);
      // Handle the error here, such as logging it or returning an error response
    } else {
      console.log("Email sent:", info.response);
      // Handle the success case here, such as logging it or returning a success response
    }
  });

  res.json("Success");
};

const changePassword = async (req, res) => {
  const user = await Users.findOne({
    where: { id: req.params.id },
  });

  if (!user) res.json("user not found");
  const hashedPassword = await bcrypt.hash(req.body.password, 12);
  user.user_password = hashedPassword;
  await user.save();
  res.json("successfully updated");
};

module.exports = {
  logIn,
  register,
  sendEmail,
  resetPassword,
  forgotPassword,
  changePassword,
};
