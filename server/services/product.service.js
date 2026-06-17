const { Op } = require("sequelize");
const Products = require("../models/product.model");

async function getAllProducts({ page = 1, pageSize = 10, search = "" } = {}) {
  const offset = (page - 1) * pageSize;
  const where = search
    ? {
        [Op.or]: [
          { name: { [Op.iLike]: `%${search}%` } },
          { description: { [Op.iLike]: `%${search}%` } },
        ],
      }
    : {};

  const { count, rows } = await Products.findAndCountAll({ where, limit: pageSize, offset });

  return {
    data: rows,
    meta: {
      pagination: { page, pageSize, total: count, pageCount: Math.ceil(count / pageSize) },
    },
  };
}

async function getProductById(id) {
  return Products.findByPk(id);
}

module.exports = { getAllProducts, getProductById };
