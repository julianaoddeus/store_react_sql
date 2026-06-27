const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Op } = require("sequelize");

const User = require("../models/users.model");

class AuthenticationController {
  static async login(req, res) {
    try {
      const { identifier, password } = req.body;

      const user = await User.findOne({
        where: identifier.includes("@")
          ? { email: identifier }
          : { username: { [Op.iLike]: identifier } },
      });

      if (!user)
        return res.status(401).json({ message: "Credenciais inválidas" });

      const valid = await bcrypt.compare(password, user.password);

      if (!valid)
        return res.status(401).json({ message: "Credenciais inválidas" });

      const token = jwt.sign(
        { id: user.id, email: user.email, username: user.username },
        process.env.JWT_SECRET,
        { expiresIn: "1d" },
      );

      res.json({
        token,
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Erro no servidor" });
    }
  }
}

module.exports = AuthenticationController;
