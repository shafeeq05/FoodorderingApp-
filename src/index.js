const express = require("express");
const app = express();
const bodyparser = require("body-parser");
const cookiParser = require('cookie-parser')
const mongoose = require("mongoose");
const session = require('express-session')
require("dotenv").config({ path: "../.env" });
// app.use(bodyparser.json());
app.use(express.json())
app.use(cookiParser())
app.use(session({secret:'shafeeq'},{maxAge:1000*60}))

//setup the mongo db connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("mongodb atless connected"))
  .catch((e) => console.log(e, "db not connected"));


//imported admin home and set the path
const adminHome = require("./routers/admin/adminHome");
app.use("/", adminHome);

//vendors Login
const vendorLogin = require('./routers/vendor/vendorLogin')
app.use('/',vendorLogin)



// coustomer Login
const userslogin = require('./routers/coustomer/login')
app.use('/',userslogin)



app.listen(process.env.PORT, () => {
  console.log("server connected");
})