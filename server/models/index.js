const Courses = require("./courses.model");
const Enrollments = require("./enrollment.model");

Courses.hasMany(Enrollments, {
  foreignKey: "courseId",
  as: "enrollments",
});

Enrollments.belongsTo(Courses, {
  foreignKey: "courseId",
  as: "courses",
});

module.exports = {
  Courses,
  Enrollments,
};
