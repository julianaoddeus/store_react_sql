const Courses = require("./courses.model");
const Enrollments = require("./enrollment.model");
const User = require("./users.model");

Courses.hasMany(Enrollments, {
  foreignKey: "courseId",
  as: "enrollments",
});

Enrollments.belongsTo(Courses, {
  foreignKey: "courseId",
  as: "courses",
});

User.hasMany(Enrollments, {
  foreignKey: "userId",
  as: "enrollments",
});

Enrollments.belongsTo(User, {
  foreignKey: "userId",
  as: "user",
});

module.exports = {
  Courses,
  Enrollments,
  User,
};
