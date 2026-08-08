const authMiddleware = require("../middleware/authMiddleware");
const express = require("express");
const upload = require("../middleware/upload");

const router = express.Router();


const {
    getProjects,
    getProjectBySlug,
    createProject,
    updateProject,
    deleteProject
} = require("../controllers/projectController");



router.get("/", getProjects);


router.get("/:slug", getProjectBySlug);



router.post(
    "/",
    authMiddleware,
    upload.single("image"),
    createProject
);


router.put(
    "/:id",
    authMiddleware,
    upload.single("image"),
    updateProject
);


router.delete(
    "/:id",
    authMiddleware,
    deleteProject
);



module.exports = router;