const express = require("express");

const router = express.Router();

const {
  handleAdminRegistration,
  handleAdminLogin,
  handleUserRegistration,
  handleUserLogin,
} = require("../controllers/userControllers");

router.post("/admin/register", handleAdminRegistration);

router.post("/admin/login", handleAdminLogin);

router.post("/user/register", handleUserRegistration);

router.post("/user/login", handleUserLogin);

module.exports = router;
