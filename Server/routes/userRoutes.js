const express = require("express");

const router = express.Router();

const {
  handleAdminRegistration,
  handleAdminLogin,
  handleUserRegistration,
  handleUserLogin,
  handleLogout,
  handleUserInfo,
} = require("../controllers/userControllers");
const { isAuthenticated, isAdmin } = require("../middlewares/auth");

router.get("/test", isAuthenticated, (req, res) => {
  return res.sendStatus(200);
});

router.get("/user/me", isAuthenticated, handleUserInfo);

router.post("/admin/register", handleAdminRegistration);

router.post("/admin/login", handleAdminLogin);

router.post("/user/register", handleUserRegistration);

router.post("/user/login", handleUserLogin);

router.get("/user/logout", isAuthenticated, handleLogout);

module.exports = router;
