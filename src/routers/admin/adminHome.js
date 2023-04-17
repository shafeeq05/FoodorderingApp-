const router = require("express").Router()
const adminControl = require('../../controllers/admin/adminHome')
const {auth} = require('../../middileware/jwtauth')

//admin Login
router.get('/adminlogin',auth.admin,adminControl.login.get)
router.post('/adminlogin',adminControl.login.post)
router.put('/adminlogin',auth.admin,adminControl.login.put)


// router.get('/AdminHome',auth,adminControl.get)

router.get('/orders',auth.admin,adminControl.order.get)

router.get('/users',auth.admin,adminControl.user.get)
router.delete('/user',auth.admin,adminControl.user.delete)

router.get('/catogery',auth.admin,adminControl.catogery.get)

//admin add catogery
router.post('/catogery',auth.admin,adminControl.catogery.post)

//admin edit catogery
router.put('/catogery',auth.admin,adminControl.catogery.put)

//admin delete cateogery
router.delete('/catogery',auth.admin,adminControl.catogery.delete)

router.get('/vendor',auth.admin,adminControl.vendor.get)
router.post('/vendor',auth.admin,adminControl.vendor.post)

// router.get("/AdminHome/EditVendor",auth,adminControl.getput)
router.put('/vendor',auth.admin,adminControl.vendor.put)

// router.get('/AdminHome/DeleteVendor',auth,adminControl.getdel)
router.delete('/vendor',auth.admin,adminControl.vendor.delete)

router.get('/adminlogout',auth.admin,adminControl.logout.get)

module.exports = router