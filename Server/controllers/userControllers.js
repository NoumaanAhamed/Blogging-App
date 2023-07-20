const User = require("../models/userModel");
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

    const isExist = await User.find({ email });

    if (isExist) {
      return res.status(409).send({ message: "admin already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = await User.create({
      ...req.body,
      password: hashedPassword,
      role: "ADMIN",
    });

    const token = generateJwtToken({ adminId: newAdmin._id });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });

    res.send({ message: "Admin Created Successfully", token });
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

    const isMatch = await bcrypt.compare(password, currentAdmin.password);

    if (!isMatch) {
      return res.status(401).send({ message: "Incorrect password" });
    }

    const token = generateJwtToken({ adminId: currentAdmin._id });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });

    res.send({
      message: "Admin LoggedIn Successfully",
      token,
    });
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

    const isExist = await User.find({ email });

    if (isExist) {
      return res.status(409).send({ message: "user already exists" });
    }

    const newUser = await User.create(req.body);

    const token = generateJwtToken({ userId: newUser._id });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });

    res.send({ message: "User Created Successfully", token });
  } catch (err) {
    res
      .status(500)
      .send({ message: "An error occurred while registering user" });
  }
}

async function handleUserLogin(req, res) {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(409).send({ message: "missing details" });
    }
    const currentUser = await User.findOne({ email, password });

    if (!currentUser) {
      return res
        .status(401)
        .send({ message: "Incorrect username or password" });
    }

    const token = generateJwtToken({ userId: currentUser._id });

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 1000 * 60 * 60,
    });

    res.send({
      message: "User LoggedIn Successfully",
      token,
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: "An error occurred while logging in user" });
  }
}

async function handleLogout(req, res) {
  try {
    // Clear the token cookie to log the user/admin out
    res.clearCookie("token");
    res.send({ message: "logout successful" });
  } catch (err) {
    res.status(500).send({ message: "An error occurred during logout" });
  }
}

module.exports = {
  handleAdminRegistration,
  handleAdminLogin,
  handleUserRegistration,
  handleUserLogin,
  handleLogout,
};
