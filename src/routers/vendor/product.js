const vendorControl = require('../../controllers/vendor/products')

const router = require('express').Router()

router.get('/VendorHome/Product',vendorControl.get)

module.exports = router