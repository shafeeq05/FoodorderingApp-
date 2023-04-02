const vendorControl = require('../../controllers/vendor/vendorHome')

const router = require('express').Router()


router.get('/VendorHome',vendorControl.get)

module.exports = router