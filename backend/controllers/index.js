const { login, register, verify, update } = require('./users')
const { createTodo, getAllTodos, updateTodo } = require('./todos')

module.exports = {
  login,
  register,
  verify,
  update,
  createTodo,
  getAllTodos,
  updateTodo,
}
