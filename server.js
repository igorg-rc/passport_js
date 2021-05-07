const express = require('express')
const mongoose = require('mongoose')
const cookieSession = require('cookie-session')
const passport = require('passport')
const keys = require('./config/keys')
const authRoutes = require('./routes/authRoutes')
require('./models/User')
require('./services/googleAuth')

mongoose
  .connect(keys.MONGO_URI, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.log(error))

// const start = async () => {
//   await mongoose.connect(keys.MONGO_URI, {
//     useUnifiedTopology: true,
//     useCreateIndex: true,
//     useNewUrlParser: true,
//     useFindAndModify: false
//   })
//   try {
//     console.log('Connected to MongoDB')
//   } catch (error) {
//     console.log(error)
//   }
// }
// start()

const app = express()

app.use(cookieSession({
  maxAge: 2 * 60 * 60 * 1000, // one month living a cookie
  keys: [keys.COOKIE_KEY]
}))

app.use(passport.initialize())
app.use(passport.session())

app.use(authRoutes)

const PORT = process.env.PORT || keys.PORT
app.listen(PORT, () => console.log(`Application is running on port ${PORT}`))