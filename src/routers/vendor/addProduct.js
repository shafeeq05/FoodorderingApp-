const vendorControl = require('../../controllers/vendor/addProduct')

const router = require('express').Router()

router.get('/VendorHome/Addproduct',vendorControl.get)
router.post('/VendorHome/Addproduct',vendorControl.post)

module.exports = router