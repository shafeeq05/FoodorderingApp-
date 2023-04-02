const router = require("express").Router()
const adminControl = require('../../controllers/admin/addvendors')


router.post('/AdminHome/addVendor',adminControl.post)
router.put('/AdminHome/EditVendor',adminControl.put)


module.exports = router