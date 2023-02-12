const dotenv = require('dotenv').config()
const path = require('path')
const { ObjectId } = require('mongodb')
const crypto = require('node:crypto')
const express = require('express')
const cors = require('cors')
const client = require('./db')
const {
  login,
  register,
  verify,
  update,
  createTodo,
  getAllTodos,
  updateTodo,
} = require('./controllers')
const { protect } = require('./middlewares')

const app = express()

app.use('/files', express.static(path.join(__dirname, 'files')))

app.use(express.static('public'))

const multer = require('multer')
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'files/')
  },
  filename: async (req, file, cb) => {
    const randomStr = crypto.randomBytes(16).toString('hex')
    const fileType = file.mimetype.split('/')[1]
    const database = client.db('testend-db')
    const collection = database.collection('todos')
    const { id, name, is_thumbnail } = req.query
    const _id = new ObjectId(id)

    if (is_thumbnail === 'true') {
      const res = await collection.updateOne(
        { _id },
        { $set: { thumbnail: `${randomStr}.${fileType}` } }
      )
    } else {
      const todo = await collection.findOne({ _id })
      const res = await collection.updateOne(
        { _id },
        {
          $set: {
            attachments: [
              ...todo.attachments,
              {
                name: file.originalname,
                urlHash: `${randomStr}.${file.originalname.split('.')[1]}`,
              },
            ],
          },
        }
      )
    }

    is_thumbnail === 'true'
      ? cb(null, `${randomStr}.${fileType}`)
      : cb(null, `${randomStr}.${file.originalname.split('.')[1]}`)
  },
})

const upload = multer({ storage: storage })

app.use(express.json())
app.use(cors())

app.get('/', async (req, res) => {
  res.send({ msg: 'Welcome to my api :)' })
})

app.post('/api/v1/users/register', (req, res) => register(req, res, client))
app.post('/api/v1/users/login', (req, res) => login(req, res, client))
app.get('/api/v1/users/verify', (req, res) => verify(req, res, client))
app.post(
  '/api/v1/users/update',
  (req, res, next) => protect(req, res, next, client),
  (req, res) => update(req, res, client)
)

app.post(
  '/api/v1/todos/create',
  (req, res, next) => protect(req, res, next, client),
  (req, res) => createTodo(req, res, client)
)

app.post(
  '/api/v1/todos/update',
  (req, res, next) => protect(req, res, next, client),
  (req, res) => updateTodo(req, res, client)
)
app.get(
  '/api/v1/todos/',
  (req, res, next) => protect(req, res, next, client),
  (req, res) => getAllTodos(req, res, client)
)

app.post(
  '/api/v1/files/upload',
  (req, res, next) => protect(req, res, next, client),
  upload.single('image'),
  (req, res) => {
    res.send({ err: false, msg: 'Image uploaded successfully' })
  }
)

app.listen(process.env.PORT, () => {
  console.log(`App listening on port ${process.env.PORT}`)
})
