const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const taskRoutes = require("./routes/taskRoutes");


// Load .env FIRST
dotenv.config();

// Ab db import karo
const db = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
// Routes
app.use("/api/users", userRoutes);
app.use("/api/tasks", taskRoutes);
// Home Route
app.get("/", (req, res) => {
    res.send("Employee Task Management API Running...");
});

// Database Connection
db.connect((err) => {
    if (err) {
        console.log("❌ Database Connection Failed");
        console.log(err.message);
        return;
    }

    console.log("✅ MySQL Connected Successfully");
});
// Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`🚀 Server Running on Port ${PORT}`);
});