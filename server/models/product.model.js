const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Products = sequelize.define(
  "Product",
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
    price: {
      type: DataTypes.DECIMAL,
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
    tableName: "products",
    createdAt: "created_at",
    updatedAt: false,
  },
);

module.exports = Products;
