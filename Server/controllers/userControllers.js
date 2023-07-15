const User = require("../models/userModel");
const { generateJwtToken } = require("../utils/jwt");
const bcrypt = require("bcrypt");

async function handleAdminRegistration(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(409).send({ message: "missing details" });
  }

  const newAdmin = await User.create({ ...req.body, role: "ADMIN" });

  const token = generateJwtToken({ adminId: newAdmin._id });

  res.send({ message: "Admin Created Successfully", token });
}

async function handleAdminLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(409).send({ message: "missing details" });
  }

  const currentAdmin = await User.findOne({ email, password });

  if (!currentAdmin) {
    return res.status(401).send({ message: "Incorrect username or password" });
  }

  const token = generateJwtToken({ adminId: currentAdmin._id });

  res.send({
    message: "Admin LoggedIn Successfully",
    token,
  });
}

async function handleUserRegistration(req, res) {
  const { username, email, password } = req.body;

  if (!username || !email || !password) {
    return res.status(409).send({ message: "missing details" });
  }

  const newUser = await User.create(req.body);

  const token = generateJwtToken({ userId: newUser._id });

  res.send({ message: "User Created Successfully", token });
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(409).send({ message: "missing details" });
  }
  const currentUser = await User.findOne({ email, password });

  if (!currentUser) {
    return res.status(401).send({ message: "Incorrect username or password" });
  }

  const token = generateJwtToken({ userId: currentUser._id });

  res.send({
    message: "User LoggedIn Successfully",
    token,
  });
}

module.exports = {
  handleAdminRegistration,
  handleAdminLogin,
  handleUserRegistration,
  handleUserLogin,
};
