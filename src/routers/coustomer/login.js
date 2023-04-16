const router = require('express').Router()
const userControl = require('../../controllers/coustomer/login')
const {auth} = require('../../middileware/jwtauth')


router.post('/signup',userControl.signup)
router.post('/verify',userControl.otp)

router.get('/login',auth.coustomer,userControl.getUser)
router.post('/login',userControl.login)

router.put('/editprofile',auth.coustomer,userControl.edit)

router.get('/viewproduct',auth.coustomer,userControl.getProduct)

router.post('/select-vendors',auth.coustomer,userControl.select)

router.post('/cart',auth.coustomer,userControl.postCart)
router.get('/cart',auth.coustomer,userControl.getCart)
router.put('/cart',auth.coustomer,userControl.update)
router.delete('/cart',auth.coustomer,userControl.deleteCart)

router.post('/orders',auth.coustomer,userControl.orders)

router.post('/payment',auth.coustomer,userControl.pay)
router.post('/payment-verify',auth.coustomer,userControl.verify)

router.get('/logout',auth.coustomer,userControl.logout)

router.delete('/deleteuser',auth.coustomer,userControl.deleteAccount)

module.exports = router