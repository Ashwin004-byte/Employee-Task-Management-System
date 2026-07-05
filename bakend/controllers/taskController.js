const db = require("../config/db");

// ================= CREATE TASK =================
const createTask = (req, res) => {

    const {
        title,
        description,
        assigned_to,
        assigned_by,
        priority,
        start_date,
        due_date
    } = req.body;

    if (!title || !assigned_to || !assigned_by) {
        return res.status(400).json({
            success: false,
            message: "Please fill required fields"
        });
    }
const sql = `
    INSERT INTO tasks
    (title, description, assigned_to, assigned_by, priority, start_date, due_date)
    VALUES (?, ?, ?, ?, ?, ?, ?)
    `;

    db.query(
        sql,
        [
            title,
            description,
            assigned_to,
            assigned_by,
            priority,
            start_date,
            due_date
        ],
        (err, result) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.status(201).json({
                success: true,
                message: "Task Created Successfully"
            });

        }
    );

};
// ================= GET ALL TASKS =================
const getAllTasks = (req, res) => {

    const sql = `
    SELECT
        tasks.*,
        u1.full_name AS assigned_to_name,
        u2.full_name AS assigned_by_name
    FROM tasks
    JOIN users u1 ON tasks.assigned_to = u1.id
    JOIN users u2 ON tasks.assigned_by = u2.id
    ORDER BY tasks.id DESC
    `;

    db.query(sql, (err, result) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            count: result.length,
            tasks: result
        });

    });

};
// ================= UPDATE TASK STATUS =================

const updateTaskStatus = (req, res) => {

    const { id } = req.params;
    const { status } = req.body;

    const sql = "UPDATE tasks SET status=? WHERE id=?";

    db.query(sql, [status, id], (err) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            message: "Task Status Updated Successfully"
        });

    });

};
// ================= DELETE TASK =================

const deleteTask = (req, res) => {

    const { id } = req.params;

    const sql = "DELETE FROM tasks WHERE id=?";

    db.query(sql, [id], (err) => {

        if (err) {
            return res.status(500).json({
                success: false,
                message: err.message
            });
        }

        res.status(200).json({
            success: true,
            message: "Task Deleted Successfully"
        });

    });

};
// ================= UPDATE TASK =================

const updateTask = (req, res) => {

    const { id } = req.params;

    const {
        title,
        description,
        assigned_to,
        priority,
        due_date,
        status
    } = req.body;

    const sql = `
    UPDATE tasks
    SET
        title=?,
        description=?,
        assigned_to=?,
        priority=?,
        due_date=?,
        status=?
    WHERE id=?
    `;

    db.query(
        sql,
        [
            title,
            description,
            assigned_to,
            priority,
            due_date,
            status,
            id
        ],
        (err) => {

            if (err) {
                return res.status(500).json({
                    success: false,
                    message: err.message
                });
            }

            res.status(200).json({
                success: true,
                message: "Task Updated Successfully"
            });

        }
    );

};
module.exports = {
    createTask,
    getAllTasks,
    updateTaskStatus,
    updateTask,
    deleteTask
};