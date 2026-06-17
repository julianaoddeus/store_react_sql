const Course = require("./Course");
const Enrollment = require("./Enrollment");

Course.hasMany(Enrollment, {
  foreignKey: "courseId",
  as: "enrollments",
});

Enrollment.belongsTo(Course, {
  foreignKey: "courseId",
  as: "course",
});

module.exports = {
  Course,
  Enrollment,
};
