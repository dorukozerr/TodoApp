const verify = async (req, res, client) => {
  const database = client.db('testend-db')
  const collection = database.collection('users')
  const { email, hash } = req.query
  //
  const user = await collection.findOne({ email })

  if (user.verifyString === hash) {
    delete user.verifyString
    user.active = true

    await collection.replaceOne({ email }, user)
    res.redirect(`${process.env.CLIENT_URL}/auth?v=true`)
  } else {
    res.send({ err: true, msg: 'Invalid parameters.' })
  }
}

module.exports = verify
