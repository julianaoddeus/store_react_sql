const userService = require("../services/user.service");

async function getUsers(req, res) {
  const users = await userService.getAllUsers();
  res.json(users);
}

async function addUser(req, res) {
  const user = await userService.createUser(req.body);
  res.status(201).json(user);
}

async function updateUser(req, res) {
  const user = await userService.editUser(req.params.id, req.body);
  res.json(user);
}

async function removeUser(req, res) {
  await userService.deleteUser(req.params.id);
  res.status(204).send();
}

module.exports = { getUsers, addUser, updateUser, removeUser };
