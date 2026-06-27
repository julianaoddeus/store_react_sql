const Enrollments = require("../models/enrollment.model");

async function getEnrollmentById(id) {
  return Enrollments.findByPk(id);
}

async function addEnrollment(data) {
  const { userId, courseId } = data;

  const exists = await Enrollments.findOne({ where: { userId, courseId } });

  if (exists?.status === "ATIVO")
    throw new Error("Usuário já está matriculado neste curso");

  if (exists?.status === "CANCELADO")
    throw new Error("Usuário já cancelou este curso e não pode se inscrever novamente");

  const enrollment = await Enrollments.create({
    userId,
    courseId,
    status: "ATIVO",
    enrolledAt: new Date(),
  });

  return enrollment;
}

async function editEnrollment(id, data) {
  await Enrollments.update(data, { where: { id } });
  return Enrollments.findByPk(id);
}

async function deleteEnrollment(id) {
  return Enrollments.destroy({ where: { id } });
}

module.exports = {
  addEnrollment,
  deleteEnrollment,
  editEnrollment,
};
