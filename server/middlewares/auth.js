const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ mensagem: "Não autorizado" });

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);   
    next();
  } catch {
    return res.status(403).json({ mensagem: "Token inválido" });
  }
};

module.exports = auth;

