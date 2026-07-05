const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= TEST API =================
const testAPI = (req, res) => {
    res.status(200).json({
        success: true,
        message: "User Controller Working"
    });
};

// ================= GET ALL USERS =================
const getAllUsers = (req, res) => {

    db.query("SELECT * FROM users", (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            count: result.length,
            users: result
        });

    });

};

// ================= REGISTER USER =================
const registerUser = (req, res) => {

    const { full_name, email, password, role, department, designation } = req.body;

    if (!full_name || !email || !password || !role) {
        return res.status(400).json({
            success: false,
            message: "Please fill all required fields"
        });
    }

    db.query(
        "SELECT * FROM users WHERE email=?",
        [email],
        async (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (result.length > 0) {
                return res.status(400).json({
                    success: false,
                    message: "Email already exists"
                });
            }

            const hashedPassword = await bcrypt.hash(password, 10);

            db.query(
                "INSERT INTO users(full_name,email,password,role,department,designation) VALUES(?,?,?,?,?,?)",
                [
                    full_name,
                    email,
                    hashedPassword,
                    role,
                    department,
                    designation
                ],
                (err) => {

                    if (err) {
                        return res.status(500).json({
                            success: false,
                            message: err.message
                        });
                    }

                    res.status(201).json({
                        success: true,
                        message: "User Registered Successfully"
                    });

                }
            );

        }
    );

};

// ================= LOGIN USER =================
const loginUser = (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "Please enter email and password"
        });
    }

    db.query(
        "SELECT * FROM users WHERE email=?",
        [email],
        async (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            if (result.length === 0) {
                return res.status(404).json({
                    success: false,
                    message: "User not found"
                });
            }

            const user = result[0];
            console.log(user);

            const isMatch = await bcrypt.compare(password, user.password);

            if (!isMatch) {
                return res.status(400).json({
                    success: false,
                    message: "Invalid Password"
                });
            }

            const token = jwt.sign(
                {
                    id: user.id,
                    role: user.role
                },
                process.env.JWT_SECRET,
                {
                    expiresIn: "7d"
                }
            );

            res.status(200).json({
                success: true,
                message: "Login Successful",
                token,
                user: {
                    id: user.id,
                    full_name: user.full_name,
                    email: user.email,
                    role: user.role
                }
            });

        }
    );

};
// ================= UPDATE USER =================
const updateUser = (req, res) => {

    const { id } = req.params;
    const { full_name, department, designation, role } = req.body;

    const sql = `
        UPDATE users
        SET full_name = ?, department = ?, designation = ?, role = ?
        WHERE id = ?
    `;

    db.query(
        sql,
        [full_name, department, designation, role, id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.status(200).json({
                success: true,
                message: "User Updated Successfully"
            });

        }
    );

};
// ================= DELETE USER =================
const deleteUser = (req, res) => {

    const { id } = req.params;

    db.query(
        "DELETE FROM users WHERE id = ?",
        [id],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.status(200).json({
                success: true,
                message: "User Deleted Successfully"
            });

        }
    );

};
module.exports = {
    testAPI,
    getAllUsers,
    registerUser,
    loginUser,
    updateUser,
    deleteUser
};