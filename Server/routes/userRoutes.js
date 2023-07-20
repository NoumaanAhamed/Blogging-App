const express = require("express");

const router = express.Router();

const {
  handleAdminRegistration,
  handleAdminLogin,
  handleUserRegistration,
  handleUserLogin,
  handleLogout,
} = require("../controllers/userControllers");
const { isAuthenticated, isAdmin } = require("../middlewares/auth");

router.get("/admin/test", isAuthenticated, isAdmin, (req, res) => {
  return res.send("Admin Inside");
});

router.get("/user/test", isAuthenticated, (req, res) => {
  return res.send("User Inside");
});

router.post("/admin/register", handleAdminRegistration);

router.post("/admin/login", handleAdminLogin);

router.post("/user/register", handleUserRegistration);

router.post("/user/login", handleUserLogin);

router.post("/user/logout", handleLogout);

module.exports = router;
