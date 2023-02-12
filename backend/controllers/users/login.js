const bcrypt = require('bcryptjs')
const { generateToken } = require('../../helpers')

const login = async (req, res, client) => {
  const { email, password } = req.body

  if (!email || !password) {
    res.send({ err: true, msg: 'Invalid request.' })
    return
  }

  const database = client.db('testend-db')
  const collection = database.collection('users')
  const user = await collection.findOne({ email })

  let isMatch = false

  if (user) isMatch = await bcrypt.compare(password, user.password)

  if (!user || !isMatch) {
    res.send({ err: true, msg: 'Invalid Credentials.' })
  } else {
    if (!user.active) {
      res.send({ err: true, msg: 'Please verify your email first.' })
      return
    }

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
}

module.exports = login
