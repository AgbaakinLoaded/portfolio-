const express = require("express");
const cors = require("cors");
const path = require("path");
require("dotenv").config();

const pool = require("./config/db");

const projectRoutes = require("./routes/projectRoutes");
const authRoutes = require("./routes/authRoutes");

const blogRoutes = require("./routes/blogRoutes");
const messageRoutes = require("./routes/messageRoutes");


const app = express();


// Middleware
app.use(cors());

app.use(express.json({
    limit: "10mb"
}));

app.use(express.urlencoded({
    extended: true,
    limit: "10mb"
}));




app.use(
    "/uploads",
    express.static(
        path.join(__dirname, "uploads")
    )
);



pool.connect()
.then(()=> console.log("PostgreSQL connected ✅"))
.catch(err => console.log("Database error:", err));

// Serve uploaded images
app.use("/uploads", express.static("uploads"));



// Routes
app.use("/api/projects", projectRoutes);
app.use("/api/blogs", blogRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);


// Test route
app.get("/", (req, res) => {

    res.json({
        message: "Portfolio API is running 🚀"
    });

});


// Server
const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {

    console.log(`Server running on port ${PORT}`);

});