const User = require("../models/userModel");
const { verifyJwtToken } = require("../utils/jwt");

function isAuthenticated(req, res, next) {
  const token = req.cookies["token"];

  if (!token) {
    return res.status(404).send({ message: "Unauthorized" });
  }

  const data = verifyJwtToken(token);

  if (!data) {
    return res.status(404).send({ message: "Invalid token" });
  }

  req.data = data;

  next();
}

function isAdmin(req, res, next) {
  if (!req.data.adminId) {
    return res.status(401).send({ message: "only admins are authorized" });
  }

  next();
}

module.exports = { isAuthenticated, isAdmin };
