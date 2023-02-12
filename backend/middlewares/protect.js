const jwt = require('jsonwebtoken')
const { ObjectId } = require('mongodb')

const protect = async (req, res, next, client) => {
  let token

  const isValid =
    req.headers.authorization && req.headers.authorization.startsWith('Bearer')

  if (isValid) {
    try {
      token = req.headers.authorization.split(' ')[1]
      const database = client.db('testend-db')
      const usersCollection = database.collection('users')
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      const _id = new ObjectId(decoded.id)

      req.user = await usersCollection.findOne({ _id })

      next()
    } catch (error) {
      console.log(error)
      res.send({ err: true, msg: 'Not authorized.' })
    }
  }

  if (!token) {
    res.send({ err: true, msg: 'Not authorized, no token.' })
  }
}

module.exports = { protect }
