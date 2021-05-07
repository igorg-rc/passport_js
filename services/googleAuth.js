const passport = require('passport')
const GoogleStrategy = require('passport-google-oauth20').Strategy
const mongoose = require('mongoose')
const keys = require('../config/keys')

const User = mongoose.model('users')


passport.serializeUser((user, done) => {
  done(null, user.id) // mongodb user id
})

passport.deserializeUser((id, done) => {
  User
    .findById(id)
    .then(user => {
      done(null, user)
    })
})

passport.use(new GoogleStrategy(
  {
    clientID: keys.GOOGLE_CLIENT_ID,
    clientSecret: keys.GOOGLE_CLIENT_SECRET,
    callbackURL: keys.GOOGLE_CALLBACK_URL
  }, 
  (accessToken, refreshToken, profile, done) => {
    User.findOne({ googleId: profile.id })
      .then((existingUser) => {
        if (existingUser) {
          // we have a record with the given profile ID
          done(null, existingUser)
        }
        else {
          // we don't have a user with this ID, make  a new record
          new User({ googleId: profile.id })
            .save()
            .then(user => done(null, user))
        }
      })
      .catch(error => console.log(error))

  })
)
