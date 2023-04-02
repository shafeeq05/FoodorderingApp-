const router = require('express').Router()
const vendorControl = require('../../controllers/vendor/vendorLogin')

router.get('/',vendorControl.get)
router.post('/',vendorControl.post)

module.exports = router