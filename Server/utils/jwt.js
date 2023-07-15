require("dotenv").config();

const jwt = require("jsonwebtoken");

function generateJwtToken(payload) {
  return jwt.sign(payload, process.env.SECRET_KEY, {
    expiresIn: "1h",
  });
}

function verifyJwtToken(token) {
  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  return decoded;
}

module.exports = { generateJwtToken, verifyJwtToken };
