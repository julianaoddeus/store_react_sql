const express = require("express");
const router = express.Router();
const auth = require("../middlewares/auth");

const authController = require("../controllers/authController");
const usersController = require("../controllers/usersController");
const coursesController = require("../controllers/coursesController");
const enrollmentsController = require("../controllers/enrollmentsController");

// auth
router.post("/login", authController.login);

// users
router.get("/users", usersController.getUsers);
router.post("/users", usersController.addUser);

// Courses
router.get("/courses", coursesController.getCourses);
router.get("/courses/enrollments/:userId", auth, coursesController.getCourseWithEnrollment);
router.get("/courses/:id", coursesController.getCourse);

// Enrollment
router.post("/enrollments/:id", auth, enrollmentsController.createEnrollment);
router.post("/enrollments", auth, enrollmentsController.createEnrollment);
router.put("/enrollments/:id", auth, enrollmentsController.updateEnrollment);

module.exports = router;
