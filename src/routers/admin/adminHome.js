const router = require("express").Router()
const adminControl = require('../../controllers/admin/adminHome')
const {auth} = require('../../middileware/jwtauth')

//admin Login
router.get('/AdminLogin',adminControl.login.get)
router.post('/AdminLogin',adminControl.login.post)
router.put('/AdminLogin',adminControl.login.put)


// router.get('/AdminHome',auth,adminControl.get)

router.get('/orders',auth.admin,adminControl.order.get)

router.get('/users',auth.admin,adminControl.user.get)

router.get('/Catogery',auth.admin,adminControl.catogery.get)

//admin add catogery
router.post('/Catogery',auth.admin,adminControl.catogery.post)

//admin edit catogery
router.put('/Catogery',auth.admin,adminControl.catogery.put)

//admin delete cateogery
router.delete('/Catogery',auth.admin,adminControl.catogery.delete)

router.get('/vendor',auth.admin,adminControl.vendor.get)
router.post('/vendor',auth.admin,adminControl.vendor.post)

// router.get("/AdminHome/EditVendor",auth,adminControl.getput)
router.put('/vendor',auth.admin,adminControl.vendor.put)

// router.get('/AdminHome/DeleteVendor',auth,adminControl.getdel)
router.delete('/vendor',auth.admin,adminControl.vendor.delete)

module.exports = router