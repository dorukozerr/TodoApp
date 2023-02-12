const createTodo = async (req, res, client) => {
  const database = client.db('testend-db')
  const collection = database.collection('todos')

  const { content, tags, status } = req.body

  if (content === undefined) {
    res.send({ error: true, msg: 'You must include content for the post' })
  } else {
    const postObj = {
      content,
      tags,
      status,
      creator: req.user._id,
      thumbnail: null,
      attachments: [],
    }
    const todo = await collection.insertOne(postObj)
    res.send({ err: false, msg: todo })
  }
}

module.exports = createTodo
