const courseService = require("../services/course.service");

async function getCourses(req, res) {
  const { page = 1, pageSize = 10, search = "" } = req.query;
  const result = await courseService.getAllCourses({
    page: Number(page),
    pageSize: Number(pageSize),
    search,
  });
  res.json(result);
}

async function getCourse(req, res) {
  const course = await courseService.getCourseById(req.params.id);
  if (!course)
    return res.status(404).json({ message: "Curso não encontrado" });
  res.json(course);
}

async function getCourseWithEnrollment(req, res) {
  const course = await courseService.getCourseByEnrollment();
  if (!course)
    return res.status(404).json({ message: "Curso não encontrado" });
  res.json(course);
}


module.exports = { getCourses, getCourse, getCourseWithEnrollment };
