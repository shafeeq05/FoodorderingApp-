const router = require("express").Router();
const vendorControl = require("../../controllers/vendor/vendorLogin");
const { auth } = require("../../middileware/jwtauth");


router.post("/Vendorlogin", vendorControl.login.post);

router.get("/profile", auth.vendor, vendorControl.profile.get);
router.put("/profile", auth.vendor, vendorControl.profile.put);

router.get("/Product", auth.vendor, vendorControl.product.get);

router.put("/Product", auth.vendor, vendorControl.product.put);

router.delete("/Product", auth.vendor, vendorControl.product.delete);


router.get("/orders", auth.vendor, vendorControl.order.get);

router.get('/vendorlogout',auth.vendor,vendorControl.logout)

module.exports = router;
