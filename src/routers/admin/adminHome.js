const router = require("express").Router()
const adminControl = require('../../controllers/admin/adminHome')

router.get('/AdminHome',adminControl.get)

module.exports = router