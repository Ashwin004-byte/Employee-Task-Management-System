-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jul 05, 2026 at 12:25 PM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `employee_task_management`
--

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE `tasks` (
  `id` int(11) NOT NULL,
  `title` varchar(255) NOT NULL,
  `description` text DEFAULT NULL,
  `start_date` date DEFAULT NULL,
  `assigned_to` int(11) NOT NULL,
  `assigned_by` int(11) NOT NULL,
  `priority` enum('Low','Medium','High') DEFAULT 'Medium',
  `status` enum('Pending','In Progress','Completed') DEFAULT 'Pending',
  `due_date` date DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `title`, `description`, `start_date`, `assigned_to`, `assigned_by`, `priority`, `status`, `due_date`, `created_at`, `updated_at`) VALUES
(10, 'build login page', 'build', NULL, 4, 1, 'Medium', 'Completed', '2026-07-23', '2026-07-05 07:47:15', '2026-07-05 07:47:57'),
(11, 'Fetch All AC Sheet Details ', 'Data Sheet Details', '2026-07-05', 7, 1, 'Medium', 'Pending', '2026-07-13', '2026-07-05 09:52:28', '2026-07-05 10:16:26');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `full_name` varchar(100) NOT NULL,
  `email` varchar(100) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` enum('admin','employee') NOT NULL,
  `department` varchar(100) DEFAULT NULL,
  `designation` varchar(100) DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `full_name`, `email`, `password`, `role`, `department`, `designation`, `created_at`, `updated_at`) VALUES
(1, 'Ashwin Lokhande', 'ashwin@gmail.com', '$2b$10$83NF/8X5vz3poAJGNGItYOukLMXgoe6y8WgBbL4COlwgl99TZRYhy', 'admin', 'IT', 'Full Stack Developer', '2026-07-04 07:57:59', '2026-07-04 07:57:59'),
(4, 'Sakshi', 'Sakshi@gmail.com', '$2b$10$no67QaH9KRolilHv3yPnWeX/l.Wa4fSLPvl/3ayN1N7CN6qR0/yGS', 'employee', 'B-Tech', 'Full Stack Developer', '2026-07-05 07:23:26', '2026-07-05 07:24:37'),
(5, 'Rahul Sharma', 'rahul@gmail.com', '$2b$10$wM8z5ZeWHN63Vli7tBG4DekZyHyltHufDOBC4S3k5OQMehFmlTyUW', 'employee', 'Engineering', 'Developer', '2026-07-05 07:28:10', '2026-07-05 07:28:10'),
(6, 'Krushna', 'krush@gmail.com', '$2b$10$4tFLyXl.Wf9Ly2HhKstc2u3p3XAaka5nULHPCpBV1PJD6GBI9aaei', 'employee', 'B-Tech', 'Developer', '2026-07-05 07:50:37', '2026-07-05 07:50:37'),
(7, 'Dipak', 'dipak@gmail.com', '$2b$10$.cY49PnafpwUWE9.Fl7E/uOpraJY9Y49PJaFYj63MfTRTIFyzfpKK', 'employee', 'ITI', 'Acountant', '2026-07-05 09:50:57', '2026-07-05 09:50:57');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tasks`
--
ALTER TABLE `tasks`
  ADD PRIMARY KEY (`id`),
  ADD KEY `assigned_to` (`assigned_to`),
  ADD KEY `assigned_by` (`assigned_by`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tasks`
--
ALTER TABLE `tasks`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tasks`
--
ALTER TABLE `tasks`
  ADD CONSTRAINT `tasks_ibfk_1` FOREIGN KEY (`assigned_to`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  ADD CONSTRAINT `tasks_ibfk_2` FOREIGN KEY (`assigned_by`) REFERENCES `users` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
