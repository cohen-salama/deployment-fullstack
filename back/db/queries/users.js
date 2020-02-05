const db = require('../db')

const getAllUsers = async () => {
  const users = await db.any('SELECT * FROM users')
  return users
}

const addNewUser = async (body) => {
  const insertQuery = 'INSERT INTO users(username, password_digest) VALUES($1, $2) RETURNING id, username'
  const newUser = await db.one(insertQuery, [body.username, body.password])
  return newUser
}

const getUserByUsername = async (username) => {
  const user = await db.oneOrNone('SELECT * FROM users WHERE username = $1', [username])
  return user
}

module.exports = {
  getAllUsers: getAllUsers,
  addNewUser: addNewUser,
  getUserByUsername: getUserByUsername
}
