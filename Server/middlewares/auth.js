const User = require("../models/userModel");
const { verifyJwtToken } = require("../utils/jwt");

function isAuthenticated(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(404).send({ message: "Unauthorized" });
  }
  const token = authHeader.split(" ")[1];

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
