const express = require("express");
const router = express.Router();
const userControllr = require('../controller/user_controller.js');

router.get("/register", userControllr.findAll);
router.post("/register", userControllr.create);
router.get("/register/:id", userControllr.findOne);
router.patch("/register/:id", userControllr.UpdateUser);
router.delete("/register/:id", userControllr.delete);
router.post('/login', userControllr.login)
module.exports = router;
