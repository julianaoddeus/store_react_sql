const User = require("../models/users.model");
const bcrypt = require("bcrypt");

async function getAllUsers() {
  return User.findAll();
}

async function createUser(data) {
  const hash = await bcrypt.hash(data.password, 10);
  return User.create({ ...data, password: hash });
}

async function findByEmail(email) {
  return User.findOne({ where: { email } });
}

async function editUser(id, data) {
  await User.update(data, { where: { id } });
  return User.findByPk(id);
}

async function deleteUser(id) {
  return User.destroy({ where: { id } });
}

module.exports = { getAllUsers, createUser, findByEmail, editUser, deleteUser };