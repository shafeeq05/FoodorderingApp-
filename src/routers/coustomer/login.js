const router = require('express').Router()
const userControl = require('../../controllers/coustomer/login')
const {auth} = require('../../middileware/jwtauth')


router.post('/signup',userControl.signup.post)

router.post('/login',userControl.login.post)
router.put('/login',userControl.login.put)

router.get('/viewproduct',auth.coustomer,userControl.login.get)

router.post('/select-vendor',auth.coustomer,userControl.select.post)

router.post('/add-to-cart',auth.coustomer,userControl.cart.post)
router.get('/add-to-cart',auth.coustomer,userControl.cart.get)

module.exports = router