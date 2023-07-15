const User = require("../models/userModel");

async function handleAdminRegistration(req, res) {
  const { username, email, password } = req.body;

  const newAdmin = await User.create({ ...req.body, role: "ADMIN" });

  res.send({ message: "Admin Created Successfully", adminId: newAdmin._id });
}

async function handleAdminLogin(req, res) {
  const { email, password } = req.body;

  const currentAdmin = await User.findOne({ email, password });

  if (!currentAdmin) {
    return res.status(401).send({ message: "Incorrect username or password" });
  }

  res.send({
    message: "Admin LoggedIn Successfully",
    adminId: currentAdmin._id,
  });
}

async function handleUserRegistration(req, res) {
  const { username, email, password } = req.body;

  const newUser = await User.create(req.body);

  res.send({ message: "User Created Successfully", userId: newUser._id });
}

async function handleUserLogin(req, res) {
  const { email, password } = req.body;

  const currentUser = await User.findOne({ email, password });

  if (!currentUser) {
    return res.status(401).send({ message: "Incorrect username or password" });
  }

  res.send({
    message: "User LoggedIn Successfully",
    userId: currentUser._id,
  });
}

module.exports = {
  handleAdminRegistration,
  handleAdminLogin,
  handleUserRegistration,
  handleUserLogin,
};
