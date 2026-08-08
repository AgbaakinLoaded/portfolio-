const express = require("express");

const router = express.Router();


const {

    createMessage,

    getMessages,

    deleteMessage

} = require("../controllers/messageController");


const protect =
    require("../middleware/authMiddleware");



// =====================================================
// PUBLIC
// =====================================================

// Visitors can send messages

router.post(

    "/",

    createMessage

);



// =====================================================
// PROTECTED ADMIN ROUTES
// =====================================================

// Admin can view messages

router.get(

    "/",

    protect,

    getMessages

);



// Admin can delete messages

router.delete(

    "/:id",

    protect,

    deleteMessage

);


module.exports = router;