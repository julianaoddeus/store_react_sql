const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Enrollment = sequelize.define(
  "Enrollments",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    courseId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "ATIVO",
    },
    enrolledAt: {
      type: DataTypes.DATE,
      field: "enrolled_at",
    },
    cancelledAt: {
      type: DataTypes.DATE,
      field: "cancelled_at",
    },
  },
  {
    tableName: "enrollments",
    timestamps: false,
  },
);

module.exports = Enrollment;
