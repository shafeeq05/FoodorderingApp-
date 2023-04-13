const router = require('express').Router()
const userControl = require('../../controllers/coustomer/login')
const {auth} = require('../../middileware/jwtauth')


router.post('/signup',userControl.signup)

router.get('/login',auth.coustomer,userControl.getuser)
router.post('/login',userControl.login)
router.put('/login',auth.coustomer,userControl.edit)

router.get('/viewproduct',auth.coustomer,userControl.login)

router.post('/select-vendors',auth.coustomer,userControl.select)

router.post('/cart',auth.coustomer,userControl.postcart)
router.get('/cart',auth.coustomer,userControl.getcart)
router.delete('/cart',auth.coustomer,userControl.delete)

router.post('/orders',auth.coustomer,userControl.orders)

router.get('/logout',auth.coustomer,userControl.logout)

module.exports = router