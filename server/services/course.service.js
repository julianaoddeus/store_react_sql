const { Op } = require("sequelize");
const Courses = require("../models/courses.model");

async function getAllCourses({ page = 1, pageSize = 10, search = "" } = {}) {
  const offset = (page - 1) * pageSize;
  const where = search
    ? {
        [Op.or]: [
          { name: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } },
        ],
      }
    : {};

  const { count, rows } = await Courses.findAndCountAll({
    where,
    limit: pageSize,
    offset,
  });

  return {
    data: rows,
    meta: {
      pagination: {
        page,
        pageSize,
        total: count,
        pageCount: Math.ceil(count / pageSize),
      },
    },
  };
}

async function getCourseById(id) {
  return Courses.findByPk(id);
}

async function getCourseByEnrollment(userId) {
  return Course.findAndCountAll({
    include: [
      {
        model: Enrollment,
        as: "enrollments",
        where: {
          userId,
        },
      },
    ],
  });
}

module.exports = { getAllCourses, getCourseById, getCourseByEnrollment };
