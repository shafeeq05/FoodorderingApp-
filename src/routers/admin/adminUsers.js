const router = require("express").Router()
const adminControl = require('../../controllers/admin/showusers')

router.get('/AdminHome/users',adminControl.get)

module.exports = router