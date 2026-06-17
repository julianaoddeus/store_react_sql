const Enrollment = require("../models/enrollment.model");

async function createEnrollment(req, res) {
  try {
    const enrollment = await courseService.addEnrollment(req.params);
    if (!enrollment)
      return res.status(404).json({ message: "Matricula não encontrada" });

    res.status(201).json(enrollment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
}

module.exports = {
  createEnrollment,
};
