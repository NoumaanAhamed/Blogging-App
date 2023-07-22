require("dotenv").config();

function sendCookie(token, res, message, statusCode = 200) {
  res
    .status(statusCode)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({ message, token });
}

module.exports = { sendCookie };
