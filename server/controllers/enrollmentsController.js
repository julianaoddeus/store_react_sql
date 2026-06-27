const enrollmentService = require("../services/enrollment.service");

async function getEnrollment(req, res) {
  const course = await enrollmentService.getEnrollmentById(req.params.id);
  if (!course)
    return res.status(404).json({ message: "Curso não encontrado" });
  res.json(course);
}

async function createEnrollment(req, res) {
  try {
    const enrollment = await enrollmentService.addEnrollment(req.body);
    if (!enrollment)
      return res
        .status(404)
        .json({ message: "Erro ao tentar se inscrever, tente novamente!" });

    res.status(201).json(enrollment);
  } catch (err) {
    const status = err.message.includes("matriculado") || err.message.includes("cancelou") ? 409 : 500;
    res.status(status).json({ message: err.message });
  }
}

async function updateEnrollment(req, res) {
  const enrollment = await enrollmentService.editEnrollment(
    req.params.id,
    req.body,
  );
  res.json(enrollment);
}

async function removeEnrollment(req, res) {
  await enrollmentService.deleteEnrollment(req.params.id);
  res.status(204).send();
}

module.exports = {
  createEnrollment,
  removeEnrollment,
  updateEnrollment,
};
