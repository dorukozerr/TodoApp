const bcrypt = require('bcryptjs')
const crypto = require('node:crypto')
const { sendEmail } = require('../../helpers')

// const hash = crypto.createHash('sha256')

const register = async (req, res, client) => {
  const { email, name, password } = req.body
  const database = client.db('testend-db')
  const collection = database.collection('users')

  if (password.length < 6) {
    res.send({
      err: true,
      msg: 'Password must be longer than five characters.',
    })
  }

  const user = await collection.findOne({ email })

  if (!user) {
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)
    const verifyString = crypto.randomBytes(16).toString('hex')
    const response = await collection.insertOne({
      email,
      name,
      password: hashedPassword,
      verifyString,
      active: false,
    })

    const testHtml = `<b>Email Verification</b><br/><a href="${process.env.SERVER_URL}/api/v1/users/verify?email=${email}&hash=${verifyString}">Verify</a>`

    sendEmail({ to: email, subject: 'Verify Email', html: testHtml })

    res.send({
      err: false,
      msg: `Please check your email to verify your account.`,
    })
  } else {
    res.send({ err: true, msg: 'User already exists.' })
  }
}

module.exports = register
