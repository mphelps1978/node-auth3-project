const router = express.Router()

const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const users = require('../users/usersModel.js')
cosnt { jwtSecret } = require('../config/secrets.js')

router.post('/register', (req, res) => {
  let user = req.body
  const hash = bcrypt.hash(user.password, 8)
  user.password = hash

  users.add(user)
    .then(saved => {
      res.status(201).json({created: `${saved}`})
    })
    .catch(err => {
      console.log(err.message)
      res.status(500).json({message: 'There was an error adding the user'})
    })
})

router.post('/login', (req, res) => {
  let { username, password } = req.body

  users.findBy({username})
    .first()
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = generateToken(user);

        res.status(200).json({
          message:  `Welcome, ${user.username}`,
          token,
        })
      } else {
        res.status(401).json({message: 'Invalid credentials'})
      }
    })
    .catch(err => {
      console.log(err.message);
      res.status(500).json({message: 'Internal error with login'})

    })
})

function generateToken(user) {
  const payload = {
    subject: user.id,
    username: user.username,
    role: user.role || 'none',
  }

  const options = {
    expiresIn: '2h'
  }

  return jwt.sign(payload, jwtSecret, options)
}

module.exports = router;