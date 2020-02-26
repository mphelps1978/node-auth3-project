const express = require('express');
const router = express.Router();

const users = require('./usersModel')

router.get('/', (req,res) => {
  users.find()
    .then(users => {
      res.status(200).json(users)
    })
})

module.exports = router