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
  const product = await courseService.getCourseById(req.params.id);
  if (!product)
    return res.status(404).json({ message: "Produto não encontrado" });
  res.json(product);
}

module.exports = { getCourses, getCourse };
