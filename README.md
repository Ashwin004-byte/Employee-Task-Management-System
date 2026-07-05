# 🚀 Employee Task Management System

A Full Stack Employee Task Management System developed as part of the **Lend A Hand India - Full Stack Developer Technical Assignment**.

The application provides a complete solution for managing employees and their assigned tasks with secure authentication, role-based access control, task tracking, and reporting.

---

# 📌 Project Overview

This system allows administrators to manage employees, assign tasks, monitor progress, and generate reports, while employees can securely log in, view their assigned tasks, and update task statuses.

The application follows a clean architecture with separate frontend and backend, REST APIs, secure authentication, and a responsive user interface.

---

# ✨ Features

## 🔐 Authentication

- Secure Login System
- JWT Authentication
- Password Encryption (bcrypt)
- Role Based Access (Admin & Employee)
- Protected Routes
- Secure Logout

---

## 👨‍💼 Admin Module

- Dashboard Overview
- Employee Management
- Add Employee
- Edit Employee
- Delete Employee
- Search Employee
- View All Employees

---

## 📋 Task Management

- Create Task
- Assign Task to Employee
- Edit Task
- Delete Task
- Search Task
- Task Priority
- Due Date
- Update Task Status
- Pending Tasks
- In Progress Tasks
- Completed Tasks

---

## 👨‍💻 Employee Module

- Employee Dashboard
- View Assigned Tasks Only
- Update Task Status
- View Due Date
- View Priority
- Track Progress

---

## 📊 Reports Dashboard

- Total Employees
- Total Tasks
- Pending Tasks
- In Progress Tasks
- Completed Tasks
- Completion Rate
- Employee-wise Task Report

---

# 🛠 Tech Stack

## Frontend

- React.js (Vite)
- React Router DOM
- Axios
- Tailwind CSS
- Lucide React Icons

## Backend

- Node.js
- Express.js
- REST API
- JWT Authentication
- bcryptjs

## Database

- MySQL

---

# 📁 Project Structure

```
Employee-Task-Management-System
│
├── backend
│   ├── config
│   ├── controllers
│   ├── middleware
│   ├── routes
│   ├── server.js
│   └── package.json
│
├── frontend
│   ├── src
│   │
│   ├── components
│   ├── context
│   ├── layouts
│   ├── pages
│   ├── routes
│   ├── services
│   ├── App.jsx
│   └── main.jsx
│
├── Database
│   └── employee_task_management.sql
│
└── README.md
```

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/YourUsername/Employee-Task-Management-System.git
```

---

## Backend Setup

```bash
cd backend
npm install
npm start
```

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

# 🗄 Database

Import the provided SQL file:

```
employee_task_management.sql
```

using phpMyAdmin or MySQL Workbench.

---

# 🔑 Environment Variables

Create a `.env` file inside the backend folder.

```
PORT=5000

DB_HOST=localhost

DB_USER=root

DB_PASSWORD=your_password

DB_NAME=employee_task_management

JWT_SECRET=your_secret_key
```

---

# 📡 REST APIs

## User APIs

| Method | Endpoint |
|----------|----------------------|
| POST | /api/users/register |
| POST | /api/users/login |
| GET | /api/users |
| PUT | /api/users/:id |
| DELETE | /api/users/:id |

---

## Task APIs

| Method | Endpoint |
|----------|---------------------|
| POST | /api/tasks |
| GET | /api/tasks |
| PUT | /api/tasks/:id |
| PUT | /api/tasks/edit/:id |
| DELETE | /api/tasks/:id |

---

# 📸 Screenshots

### Login Page

(Add Screenshot)

---

### Admin Dashboard

(Add Screenshot)

---

### Employee Dashboard

(Add Screenshot)

---

### Employee Management

(Add Screenshot)

---

### Task Management

(Add Screenshot)

---

### Reports Dashboard

(Add Screenshot)

---

# 🏗 Architecture

```
React.js Frontend
        │
        ▼
React Router + Axios
        │
        ▼
Node.js + Express.js
        │
        ▼
REST APIs
        │
        ▼
MySQL Database
```

---

# 🎯 Assignment Features Covered

- User Authentication
- Role Based Authorization
- Employee CRUD
- Task CRUD
- Task Assignment
- Due Date Management
- Task Status Management
- Reports Dashboard
- Protected Routes
- Responsive UI
- Clean Folder Structure
- REST APIs
- Validation & Error Handling

---

# 🚀 Future Enhancements

- Email Notifications
- Charts & Graph Analytics
- File Uploads
- Export Reports (PDF/Excel)
- Notifications
- Calendar View
- Dark Mode

---

# 👨‍💻 Developed By

**Ashwin Lokhande**

Master of Computer Applications (MCA)

Full Stack MERN Developer

---

Admine login <img width="673" height="584" alt="image" src="https://github.com/user-attachments/assets/33d22c35-7619-41e3-b989-6d9d340cec79" />


Employee Task Management Dashboard <img width="1908" height="969" alt="image" src="https://github.com/user-attachments/assets/f10518da-c616-4b09-922c-a1f83eaaf33f" />

Employee management <img width="1919" height="967" alt="image" src="https://github.com/user-attachments/assets/1047952d-ce69-48e2-844a-386d3e9e6b00" />

Employee_wise Task Report <img width="1918" height="936" alt="image" src="https://github.com/user-attachments/assets/28eede3a-f8d2-424d-9a7a-fc2564add714" />

 ## Architecture Diagram

![Architecture Diagram](Architecture-Diagram.png)
# 📄 License
 
This project was developed solely for the **Lend A Hand India Full Stack Developer Technical Assignment**.
