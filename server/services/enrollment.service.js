const Enrollment = require("../models/enrollment.model");

async function addEnrollment(data) {
  const { userId, courseId } = data;

  const exists = await Enrollment.findOne({
    where: {
      userId,
      courseId,
      status: "ATIVO",
    },
  });

  if (exists) {
    return res.status(400).json({
      message: "Usuário já está matriculado neste curso",
    });
  }

  const enrollment = await Enrollment.create({
    userId,
    courseId,
    status: "ATIVO",
    enrolledAt: new Date(),
  });
}

module.exports = {
  addEnrollment,
};
