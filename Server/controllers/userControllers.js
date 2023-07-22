const User = require("../models/userModel");
const { sendCookie } = require("../utils/cookies");
const { generateJwtToken } = require("../utils/jwt");
const bcrypt = require("bcrypt");

//!ensure password is string

//* functions for routes folder
async function handleAdminRegistration(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(409).send({ message: "missing details" });
    }

    const isExist = await User.findOne({ email }); //!Don't use find()

    if (isExist) {
      return res.status(409).send({ message: "admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password.toString(), 10);

    const newAdmin = await User.create({
      ...req.body,
      password: hashedPassword,
      role: "ADMIN",
    });

    const token = generateJwtToken({ adminId: newAdmin._id });

    sendCookie(token, res, "Admin Created Successfully", 201);
  } catch (err) {
    res
      .status(500)
      .send({ message: "An error occurred while registering admin" });
  }
}

async function handleAdminLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(409).send({ message: "missing details" });
    }

    const currentAdmin = await User.findOne({ email });

    if (!currentAdmin) {
      return res.status(404).send({ message: "admin not found" });
    }

    const isMatch = await bcrypt.compare(
      password.toString(),
      currentAdmin.password
    );

    if (!isMatch) {
      return res.status(401).send({ message: "Incorrect password" });
    }

    const token = generateJwtToken({ adminId: currentAdmin._id });

    sendCookie(token, res, "Admin LoggedIn Successfully", 200);
  } catch (err) {
    res
      .status(500)
      .send({ message: "An error occurred while logging in admin" });
  }
}

async function handleUserRegistration(req, res) {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(409).send({ message: "missing details" });
    }

    const isExist = await User.findOne({ email });

    if (isExist) {
      return res.status(409).send({ message: "user already exists" });
    }

    const hashedPassword = await bcrypt.hash(password.toString(), 10);

    const newUser = await User.create({
      ...req.body,
      password: hashedPassword,
    });

    const token = generateJwtToken({ userId: newUser._id });

    sendCookie(token, res, "User registered Successfully", 201);
  } catch (err) {
    res
      .status(500)
      .send({ message: "An error occurred while registering user" });
  }
}

async function handleUserLogin(req, res) {
  // try {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(409).send({ message: "missing details" });
  }
  const currentUser = await User.findOne({
    email,
  });

  if (!currentUser) {
    return res.status(404).send({ message: "user not found" });
  }

  const isMatch = await bcrypt.compare(
    password.toString(),
    currentUser.password
  );

  if (!isMatch) {
    return res.status(401).send({ message: "Incorrect password" });
  }

  const token = generateJwtToken({ userId: currentUser._id });

  sendCookie(token, res, "User LoggedIn Successfully", 200);

  // } catch (err) {
  //   res
  //     .status(500)
  //     .send({ message: "An error occurred while logging in user" });
  // }
}

async function handleLogout(req, res) {
  try {
    // Clear the token cookie to log the user/admin out

    res
      .status(200)
      .cookie("token", "", {
        expires: new Date(Date.now()),
        sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
        secure: process.env.NODE_ENV === "Development" ? false : true,
      })
      .json({
        message: "logged out",
        userId: req.data.userId || req.data.userId,
      });
  } catch (err) {
    res.status(500).send({ message: "An error occurred during logout" });
  }
}

async function handleUserInfo(req, res) {
  const id = req.data.userId || req.data.adminId;

  const userDetails = await User.findById(id);

  res.send({ message: "User Verified", userDetails });
}

module.exports = {
  handleAdminRegistration,
  handleAdminLogin,
  handleUserRegistration,
  handleUserLogin,
  handleLogout,
  handleUserInfo,
};
