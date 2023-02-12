const { generateToken } = require('../../helpers')

const update = async (req, res, client) => {
  const database = client.db('testend-db')
  const collection = database.collection('users')

  const { email, fields } = req.body

  let user = await collection.findOne({ email })

  user = { ...user, ...fields }

  await collection.replaceOne({ email }, user)

  res.send({
    err: false,
    msg: {
      id: user._id,
      email: user.email,
      name: user.name,
      token: generateToken(user._id),
    },
  })
}

module.exports = update
