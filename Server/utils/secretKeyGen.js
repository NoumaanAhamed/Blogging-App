const crypto = require("crypto");

const secretKey = crypto.randomBytes(256).toString("base64");

console.log(secretKey);
