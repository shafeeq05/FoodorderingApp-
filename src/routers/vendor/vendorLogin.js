const router = require('express').Router()
const vendorControl = require('../../controllers/vendor/vendorLogin')
const {auth} = require('../../middileware/jwtauth')


router.get('/Vendorlogin',vendorControl.login.get)
router.post('/Vendorlogin',vendorControl.login.post)

router.get('/profile',auth.vendor,vendorControl.profile.get)
router.put('/profile',auth.vendor,vendorControl.profile.put)

router.get('/Product',auth.vendor,vendorControl.product.get)
router.post('/Product',auth.vendor,vendorControl.product.post)
router.put('/Product',auth.vendor,vendorControl.product.put)

router.get('/orders',auth.vendor,vendorControl.order.get)

module.exports = router