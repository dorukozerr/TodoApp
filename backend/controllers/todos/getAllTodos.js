const { ObjectId } = require('mongodb')

const getAllTodos = async (req, res, client) => {
  const database = client.db('testend-db')
  const collection = database.collection('todos')

  const _id = new ObjectId(req.user._id)
  const todos = await collection.find().toArray()

  res.send({
    err: false,
    msg: todos.filter(todo => todo.creator.toString() === _id.toString()),
  })
}

module.exports = getAllTodos
