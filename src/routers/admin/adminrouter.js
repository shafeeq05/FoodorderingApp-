const router = require('express').Router()
const adminControl = require('../../controllers/admin/adminLogin')

router.get('/',adminControl.get)
router.post('/',adminControl.post)
router.put('/',adminControl.put)


module.exports=router