const express = require('express')
const path = require('path')
const configDB = require('./configs/configDB')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const session = require('express-session')
const homeRoutes = require('./routes/home')
const cardRoutes = require('./routes/card')
const addRoutes = require('./routes/add')
const ordersRoutes = require('./routes/orders')
const coursesRoutes = require('./routes/courses')
const authRoutes = require('./routes/auth')
const User = require('./models/user')
const varMiddleware = require('./middleware/variables')

const app = express()

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')


app.use(async (req, res, next) => {
  try {
    const user = await User.findById('5e52f8c54c61e90edb48f188')
    req.user = user
    next()
  } catch (e) {
    console.log(e)
  }
})


app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))
app.use(session({
  secret: 'some secret value',
  resave: false,
  saveUninitialized: false
}))
app.use(varMiddleware)

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)
app.use('/orders', ordersRoutes)
app.use('/auth', authRoutes)



const PORT = process.env.PORT || 3000

async function start() {
  try {
    // const url = `mongodb://root:mogaba@127.0.0.1:27017/test?authSource=admin`
    // await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    await mongoose.connect(configDB.dbURI, configDB.dbOptions)
    const candidate = await User.findOne()
    if (!candidate) {
      const user = new User({
        email: 'vladilen@mail.ru',
        name: 'Vladilen',
        cart: {items: []}
      })
      await user.save()
    }
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()



