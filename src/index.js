const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const mongoose = require("mongoose");
require("dotenv").config({ path: "../.env" });
app.use(bodyparser.json());

//setup the mongo db connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("mongodb atless connected"))
  .catch((e) => console.log(e, "db not connected"));

  
// required the admin router and set the path
const adminRouter = require("./routers/admin/adminrouter");
app.use("/AdminLogin", adminRouter);

//imported the admin vendors router and set the path
const adminVendor = require("./routers/admin/adminvendors");
app.use("/", adminVendor);

// imported admin catogry router and set the path
const adminCatogery = require("./routers/admin/adminCatogery");
app.use("/", adminCatogery);

//imported admin show users router and set the path
const adminUsers = require("./routers/admin/adminUsers");
app.use("/", adminUsers);

//imported admin show orders router and set the path
const adminOrders = require("./routers/admin/adminOrder");
app.use("/", adminOrders);

//imported admin home and set the path
const adminHome = require("./routers/admin/adminHome");
app.use("/", adminHome);

//vendors Login
const vendorLogin = require('./routers/vendor/vendorLogin')
app.use('/Vendorlogin',vendorLogin)

//Vendor Home
const vendorHome = require('./routers/vendor/vendorHome')
app.use('/',vendorHome)

//vendor add product
const products = require('./routers/vendor/product')
app.use('/',products)

//vendor add product
const addProduct = require('./routers/vendor/addProduct')
app.use('/',addProduct)

console.log(process.env.MONGO_URL);

app.listen(process.env.PORT, () => {
  console.log("server connected");
})