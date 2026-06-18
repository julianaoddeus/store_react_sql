const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Courses = sequelize.define(
  "Courses",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    startDate: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    stock: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageURL: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "courses",
    createdAt: "created_at",
    updatedAt: false,
  },
);

module.exports = Courses;
