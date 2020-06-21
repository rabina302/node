const express = require("express");
const { getStaffs, addStaff } = require("../controllers/staff");
const router = express.Router();
const { protect } = require("../middleware/auth");

// router.post("/register", register);
// router.post("/login", login);

router.route("/").post(protect, addStaff).get(getStaffs);

module.exports = router;
