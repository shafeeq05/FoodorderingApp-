const router = require('express').Router()
const adminControl = require('../../controllers/admin/catogeryControl')


//admin add catogery
router.get('/AdminHome/Catogery',adminControl.get)

//admin add catogery
router.post('/AdminHome/Catogery/Add_catogery',adminControl.post)

//admin edit catogery
router.put('/AdminHome/Catogery/Edit_catogery',adminControl.put)

//admin delete cateogery
router.delete('/AdminHome/Catogery/Remove',adminControl.delete)

module.exports=router