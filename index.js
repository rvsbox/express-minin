const express = require('express')
const path = require('path')
const configDB = require('./configs/configDB')
const mongoose = require('mongoose')
const exphbs = require('express-handlebars')
const homeRoutes = require('./routes/home')
const cardRoutes = require('./routes/card')
const addRoutes = require('./routes/add')
const coursesRoutes = require('./routes/courses')

const app = express()

const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs'
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs')
app.set('views', 'views')

app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({extended: true}))

app.use('/', homeRoutes)
app.use('/add', addRoutes)
app.use('/courses', coursesRoutes)
app.use('/card', cardRoutes)



const PORT = process.env.PORT || 3000

async function start() {
  try {
    // const url = `mongodb://root:mogaba@127.0.0.1:27017/test?authSource=admin`
    // await mongoose.connect(url, {useNewUrlParser: true, useUnifiedTopology: true})
    await mongoose.connect(configDB.dbURI, configDB.dbOptions)
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`)
    })
  } catch (e) {
    console.log(e)
  }
}

start()



