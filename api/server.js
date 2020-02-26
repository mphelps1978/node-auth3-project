const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('../auth/authRouter')
const usersRouter = require('../users/usersRouter')
const restricted = require('../auth/restricted')

const server = express();

server.use(helmet())
server.use(express.json())
server.use(cors())

server.use('/api/users', restricted, usersRouter)
server.use('/api', authRouter)

server.get('/', (req, res) => {
  res.send('<h2>Node JWT Project</h2><h3>Michael Phelps</h3>')
})

module.exports = server
