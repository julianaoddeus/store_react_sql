const productService = require("../services/product.service");

async function getProducts(req, res) {
  const { page = 1, pageSize = 10, search = "" } = req.query;
  const result = await productService.getAllProducts({
    page: Number(page),
    pageSize: Number(pageSize),
    search,
  });
  res.json(result);
}

async function getProduct(req, res) {
  const product = await productService.getProductById(req.params.id);
  if (!product) return res.status(404).json({ message: "Produto não encontrado" });
  res.json(product);
}

module.exports = { getProducts, getProduct };
