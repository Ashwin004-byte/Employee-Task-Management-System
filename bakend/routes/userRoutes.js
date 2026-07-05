const express = require("express");

const router = express.Router();

const {
    testAPI,
    getAllUsers,
    registerUser,
    loginUser,
    updateUser,
    deleteUser
} = require("../controllers/userController");

router.get("/test", testAPI);

router.get("/", getAllUsers);

router.post("/register", registerUser);

router.post("/login", loginUser);

router.put("/:id", updateUser);

router.delete("/:id", deleteUser);

module.exports = router;