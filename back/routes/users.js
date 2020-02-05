const express = require('express')
const router = express.Router()
const usersQueries = require('../db/queries/users')
const helpers = require('../helpers')

router.get('/', async (req, res, next) => {
  try {
    let users = await usersQueries.getAllUsers()
    res.json({
      payload: users,
      msg: 'users retrieved',
      err: false
    })
  } catch (err) {
    res
       .status(500)
       .json({
         payload: null,
         msg: 'failed retrieving users',
         err: true
    })
  }
})

module.exports = router
