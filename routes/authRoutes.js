const passport = require('passport')
const express = require('express')
const router = express.Router()

router.get('/auth/google', passport.authenticate('google', {
  scope: ['profile', 'email']
}))

router.get('/auth/google/callback', passport.authenticate('google'))

router.get('/api/logout', (req, res) => {
  req.logout()
  res.send(req.user)
  console.log(req.user)
})

router.get('/api/current_user', (req, res) => {
  console.log(req.user)
  res.send(req.user)
})


module.exports = router