# Case Study - Monorepo

## Backend

- Register (with email verification)
- Login
- Create Todo
- Edit Todo
- Add thumbnail to Todo
- Add attachments to Todo
- Download/View attachments from Todo

## Frontend

- GUI for related backend functionalities

---

## Required Environment variables

`.env` files are located in root of each folder

`backend`

```js
NODE_ENV = ''
MONGO_URI = ''
PORT = ''
JWT_SECRET = ''
MAIL_ADDRESS = ''
MAIL_PASSWORD = ''
CLIENT_URL = ''
SERVER_URL = ''
```

- [gmail nodemailer password generation](https://www.youtube.com/watch?v=nP3EA2IPYkk)

- Due to security reasons, I shouldn't share environment variables. But the app kickstarts with them quite smoothly.

- MongoDB collection names are `todos` and `users`. Any URI should work just fine. But be careful about collection name collision.
- Default ones are below but it can vary if ports are in use.

```js
CLIENT_URL = 'http://localhost:1234'
SERVER_URL = 'http://localhost:3000'
```

`frontend`

```js
SERVER_URL = ''
```

- Default one is `'http://localhost:3000'`

---

### To Run App (with .env vars!)

`backend`

```bash
cd backend
npm i
npm start
```

`frontend`

```bash
cd frontend
npm i
npm start
```

`Shortcut from the root`

```
npm i
npm run prepare
npm run kickstart
```
