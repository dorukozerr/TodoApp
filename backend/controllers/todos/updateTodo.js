const { ObjectId } = require('mongodb')

const updateTodo = async (req, res, client) => {
  const database = client.db('testend-db')
  const collection = database.collection('todos')

  const { id, fields } = req.body
  const _id = new ObjectId(id)

  const result = await collection.updateOne({ _id }, { $set: { ...fields } })

  res.send(result)
}

module.exports = updateTodo
