const router = require("express").Router()
const adminControl = require('../../controllers/admin/showOrders')


router.get('/AdminHome/orders',adminControl.get)

module.exports = router