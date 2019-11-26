require('dotenv').config()

const express = require('express')
const bodyParser = require('body-parser')
const { name, version } = require('./package.json')
const { registerUser, authenticateUser, retrieveUser, deleteUser, editUser/*, createTask, listTasks, modifyTask, removeTask*/ } = require('./logic')
const jwt = require('jsonwebtoken')
const { argv: [, , port], env: { SECRET, PORT = port || 8080, DB_URL } } = process
const tokenVerifier = require('./helpers/token-verifier')(SECRET)
const cors = require('./utils/cors')
const { errors: { NotFoundError, ConflictError, CredentialsError } } = require('wheely-utils')
const { database } = require('wheely-data')


const api = express()

const jsonBodyParser = bodyParser.json()

api.use(cors)

api.options('*', cors, (req, res) => {
  res.end()
})

api.post('/users', jsonBodyParser, (req, res) => {
  const { body: { name, surname, email, password, role } } = req

  try {
    registerUser(name, surname, email, password, role)
      .then(() => res.status(201).end())
      .catch(error => {
        const { message } = error

        if (error instanceof ConflictError)
          return res.status(409).json({ message })

        res.status(500).json({ message })
      })
  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

/*
api.post('/users', jsonBodyParser, async (req, res) => {
  const { body: { name, surname, email, password, role } } = req

  try {
    await registerUser(name, surname, email, password, role)
    res.status(201).end()
  } catch (error) {
    const { message } = error

    if (error instanceof ConflictError)
      return res.status(409).json({ message })
    res.status(400).json({ message })
  }
})
*/


api.post('/auth', jsonBodyParser, (req, res) => {
  const { body: { email, password } } = req

  try {
    authenticateUser(email, password)
      .then(id => {
        const token = jwt.sign({ sub: id }, SECRET, { expiresIn: '1d' })
        //revisar como se convierte id en token!
        res.json({ token })
      })
      .catch(error => {
        const { message } = error

        if (error instanceof CredentialsError)
          return res.status(401).json({ message })

        res.status(500).json({ message })
      })
  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

api.get('/users', tokenVerifier, (req, res) => {
  //tokenVerifier añade el id que reciben del token en header en req?
  try {
    const { id } = req

    retrieveUser(id)
      .then(user => res.json({ user }))
      .catch(error => {
        const { message } = error

        if (error instanceof NotFoundError)
          return res.status(404).json({ message })

        res.status(500).json({ message })
      })
  } catch (error) {
    const { message } = error

    res.status(400).json({ message })
  }
})

api.delete('/users', tokenVerifier, (req, res) => {
  try {
    const { id } = req

    deleteUser(id)
      .then(() => res.end())
      .catch(error => {
        const { message } = error

        if (error instanceof NotFoundError)
          return res.status(404).json({ message })
        if (error instanceof ConflictError)
          return res.status(409).json({ message })

        res.status(500).json({ message })
      })
  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

api.patch('/users', jsonBodyParser, tokenVerifier, (req, res) => {
  try {
    const { id, body: { name, surname, email } } = req

    editUser(id, name, surname, email)
      .then(() => res.end() )
      .catch(error => {
        const { message } = error

        if (error instanceof NotFoundError)
          return res.status(404).json({ message })
        if (error instanceof ConflictError)
          return res.status(409).json({ message })

        res.status(500).json({ message })
      })
  } catch ({ message }) {
    res.status(400).json({ message })
  }
})








/*
api.post('/tasks', tokenVerifier, jsonBodyParser, (req, res) => {
  try {
    const { id, body: { title, description } } = req

    createTask(id, title, description)
      .then(id => res.status(201).json({ id }))
      .catch(error => {
        const { message } = error

        if (error instanceof NotFoundError)
          return res.status(404).json({ message })

        res.status(500).json({ message })
      })
  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

api.get('/tasks', tokenVerifier, (req, res) => {
  try {
    const { id } = req

    listTasks(id)
      .then(tasks => res.json(tasks))
      .catch(error => {
        const { message } = error

        if (error instanceof NotFoundError)
          return res.status(404).json({ message })

        res.status(500).json({ message })
      })
  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

api.patch('/tasks/:taskId', tokenVerifier, jsonBodyParser, (req, res) => {
  try {
    const { id, params: { taskId }, body: { title, description, status } } = req

    modifyTask(id, taskId, title, description, status)
      .then(() =>
        res.end()
      )
      .catch(error => {
        const { message } = error

        if (error instanceof NotFoundError)
          return res.status(404).json({ message })
        if (error instanceof ConflictError)
          return res.status(409).json({ message })

        res.status(500).json({ message })
      })
  } catch ({ message }) {
    res.status(400).json({ message })
  }
})

api.delete('/tasks/:taskId', tokenVerifier, (req, res) => {
  try {
    const { id, params: { taskId } } = req

    removeTask(id, taskId)
      .then(() =>
        res.end()
      )
      .catch(error => {
        const { message } = error

        if (error instanceof NotFoundError)
          return res.status(404).json({ message })
        if (error instanceof ConflictError)
          return res.status(409).json({ message })

        res.status(500).json({ message })
      })
  } catch ({ message }) {
    res.status(400).json({ message })
  }
})
*/
database
  .connect(DB_URL)
  .then(() => api.listen(PORT, () => console.log(`${name} ${version} up and running on port ${PORT}`)))
