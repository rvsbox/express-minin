const {Router} = require('express')
const User = require('../models/user')
const router = Router()

router.get('/login', async (req, res) => {
  res.render('auth/login', {
    title: 'Авторизация',
    isLogin: true
  })
})

router.get('/logout', async (req, res) => {
  req.session.destroy(() => {
    res.redirect('/auth/login#login')
  })
})

router.post('/login', async (req, res) => {
  const user = await User.findById('5e52f8c54c61e90edb48f188')
  req.session.user = user
  req.session.isAuthenticated = true
  req.session.save(err => {
    if (err) {
      throw err
    }
    res.redirect('/')
  })
})

module.exports = router
