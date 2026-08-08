const express = require("express");

const router = express.Router();


const {

    getBlogs,
    getBlogBySlug,
    createBlog,
    updateBlog,
    deleteBlog

} = require("../controllers/blogController");


const authMiddleware = require("../middleware/authMiddleware");
const upload = require("../middleware/uploadMiddleware");


// Public

router.get("/", getBlogs);

router.get("/:slug", getBlogBySlug);




// Public

router.get("/", getBlogs);

router.get("/:slug", getBlogBySlug);


// Protected

router.post(
    "/",
    authMiddleware,
    upload.single("image"),
    createBlog
);


router.put(
    "/:id",
    authMiddleware,
    upload.single("image"),
    updateBlog
);


router.delete(
    "/:id",
    authMiddleware,
    deleteBlog
);


module.exports = router;