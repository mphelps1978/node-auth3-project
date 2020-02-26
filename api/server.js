const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('./auth/authRouter')
const userRouter = require('./users/userRouter')
const restricted = require('./auth/restricted')

const server = express();

server.use(helmet())
server.use(express.json())
server.use(cors())

server.use('/api/auth', authRouter)
server.use('/api/users', restricted, checkRole(user), userRouter)

server.get('/' (req, res) => {
  res.send('<h2>Node JWT Project</h2><h3>Michael Phelps</h3>')
})

module.exports = server


const checkRole(role) {
  return (req, res, next) => {
    if(req.decodedToken &&
       req.decodedToken.role &&
       req.decodedToken.role.toLowercase() === role
       )
      {
       next();
      } else {
        res.status(403).json({message: 'You do not have access to this resource'})
      }
  }
}