const express = require("express");
const router = express.Router();

const authController = require("../controllers/authController");
const usersController = require("../controllers/usersController");
const coursesController = require("../controllers/coursesController");
const enrollmentsController = require("../controllers/enrollmentsController");

// auth
router.post("/login", authController.login);

// users
router.get("/users", usersController.getUsers);
router.post("/users", usersController.addUser);
router.put("/users/:id", usersController.updateUser);
router.delete("/users/:id", usersController.removeUser);

// Courses
router.get("/courses", coursesController.getCourses);
router.get("/courses/:id", coursesController.getCourse);
router.get("/courses/enrollment", coursesController.getCourseWithEnrollment);

// Enrollment
router.get("/addEnrollment", enrollmentsController.createEnrollment);
module.exports = router;
