const express = require("express");

const router = express.Router();

const {
    loginAdmin,
    verifyAdmin
} = require("../controllers/authController");

const protect =
    require("../middleware/authMiddleware");


// Admin login

router.post(
    "/login",
    loginAdmin
);


// Verify admin token

router.get(
    "/verify",
    protect,
    verifyAdmin
);


module.exports = router;