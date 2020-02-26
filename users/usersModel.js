const db = require('../data/dbconfig')

module.exports = {
  add,
  find,
  findBy,
  findById,
}

function find() {
  return db('users').select('id', 'username', 'password')
}

function findBy(fbFilter) {
  return db('users').where(fbFilter)
}

async function add(user) {
  const [id]  = await db('users').insert(user)

  return findById(id)
}

function findById(id){
  return db('users').where({id}).first()
}