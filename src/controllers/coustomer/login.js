const bcript = require("bcrypt");
const nodemailer = require("nodemailer");
const scheema = require("../../model/customerscheema");
const productScheema = require("../../model/addVendorScheema");
const jwt = require("jsonwebtoken");
const Razonpay = require('razorpay')
const crypto = require('crypto')
const salt = 10;

const razonpay = new Razonpay({
    key_id:process.env.key_id,
    key_secret:process.env.key_secret
})

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

module.exports = {
  //-------------------coustomer signup---------------------

  signup: async (req, res) => {
    try {
      const otp = 1000 + Math.floor(Math.random() * 8999);
      req.body.midotp = otp;
      req.session.sign = req.body;
      console.log(req.session.sign);
      transporter.sendMail({
        to: email,
        from: "abc@gmail.com",
        html: `<h3> This your token for OTP Verfication <strong>${otp}</strong></h3>`,
      });
      res.end();
    } catch (error) {}
  },
  //-----------------otpverification----------------------------------
  otp: async (req, res) => {
   try {
    console.log(req.session.sign);
    if (req.session.sign.midotp == req.body.otp) {
      const encript = await bcript.hash(req.body.password, salt);
      console.log(encript);
      await new scheema({
        name: req.body.name,
        username: req.body.username,
        password: encript,
        email: req.body.email,
      }).save();

      res.status(200).json("register succsess");
    } else {
      res.send("incorrect otp");
    }
    
   } catch (error) {
    
   }
  },

  //------------------coustomer login------------------------
  getProduct: async (req, res) => {
    try {
      const data = await productScheema.find({}, { product: 1 });
      res.json(data);
    } catch (error) {
      res.send("error");
    }
  },
  login: async (req, res) => {
    try {
      // console.log(req.body);
      const exist = await scheema.find({ username: req.body.username });
      // console.log(exist);
      if (exist.length == 1) {
        bcript.compare(req.body.password, exist[0].password).then((pwd) => {
          if (pwd) {
            const encript = jwt.sign({ id: exist[0]._id }, "shafeeq");
            res.cookie("user", { encript }, { httpOnly: true });
            res.status(200).send("login sucsess");
          } else {
            res.status(404).send("password error");
          }
        });
      } else {
        res.status(404).send("username not exist");
      }
    } catch (error) {
      res.status(404).send("internal error");
    }
  },
  edit: async (req, res) => {
    try {
      const usr = await scheema.updateOne(
        {
          _id: req.body.jwtid,
        },
        {
          name: req.body.name,
          username: req.body.username,
          email: req.body.email,
        }
      );
      res.status(200).json("sucsessfully updated");
    } catch (error) {
      res.status(404).json("something went wrong");
    }
  },
  getUser: async (req, res) => {
    try {
      const usr = await scheema.find({ _id: req.body.jwtid });
      res.status(200).json(usr);
    } catch (error) {
      res.status(404).json("something went wrong");
    }
  },

  //coustomer select vendors
  select: async (req, res) => {
    // console.log(req.params);
    const data = await productScheema.find(
      { _id: req.body.vendor },
      { password: 0 }
    );
    console.log(data);
    res.status(200).json(data);
  },

  //---------------------product add to cart-----------------------

  getCart: async (req, res) => {
    const cart = await scheema.find({ _id: req.body.jwtid }, { cart: 1 });
    console.log(cart);
    res.status(200).json(cart);
  },

  postCart: async (req, res) => {
    try {
      const { vid, pid } = req.body;
      const product = await productScheema.find(
        { "product._id": pid },
        { "product.$": 1 }
      );
      console.log(product);
      const user = await scheema.find({ _id: req.body.jwtid });
      console.log(user);

      if (user) { 
        const cart = await scheema.find({ "cart.pid": pid }, { "cart.$": 1 });
        if (cart.length == 0) {
          const data = await scheema.updateMany(
            { _id: req.body.jwtid },
            {
              $push: {
                cart: {
                  name: product[0].product[0].name,
                  price: product[0].product[0].price,
                  qnty: product[0].product[0].qnty,
                  img: product[0].product[0].img,
                  itemcode: product[0].product[0].itemcode,
                  pid: product[0].product[0]._id,
                  vid: product[0]._id,
                },
              },
            }
          );

          console.log(data, "if nte ullil");
          res.status(200).json("ok....if nte ulli");
        } else {
          const cart = await scheema.updateOne(
            { $and: [{ _id: user[0]._id }, { "cart.pid": pid }] },
            { $inc: { "cart.$.qnty": 1 } }
          );
          res.status(200).json("ok... elseil");
          console.log(cart);
        }
      }
    } catch (error) {
      console.log(error);
      res.send("error");
    }
  },
  update: async (req, res) => {
    try {
      await scheema.updateOne(
        {
          $and: [{ _id: req.body.jwtid }, { "cart.pid": req.body.itemid }],
        },
        { $inc: { "cart.$.qnty": -1 } }
      );
      res.status(200).json("updated succsessfully");
    } catch (error) {
      res.status(404).json("error somthing went wrong");
    }
  },
  deleteCart: async (req, res) => {
    try {
      const cart = await scheema.updateOne(
        { _id: req.body.jwtid },
        { $pull: { cart: { pid: req.body.itemid } } }
      );
      console.log(cart);
      res.status(200).json("sucsessfully updated");
    } catch (error) {
      res.status(404).json("error somthing went wrong");
    }
  },

  orders: async (req, res) => {
    try {
      const user = await scheema.find(
        { "cart._id": req.body.id },
        { "cart.$": 1 }
      );
      console.log(user);
      const { name, price, qnty, itemcode } = user[0].cart[0];
      const usr = await scheema.updateMany(
        { _id: req.body.jwtid },
        {
          $push: {
            orders: {
              name: name,
              qnty: qnty,
              totalamt: qnty * price,
              itemcode: itemcode,
              status: "placed",
            },
          },
        }
      );
      console.log(user, usr);
      res.status(200).send("order");
    } catch (error) {
      // console.log(error);
      res.status(404).json("error somthing went wrong");
    }
  },
  logout: async (req, res) => {
    console.log();
    const encript = jwt.sign({ id: req.body.jwtid }, "shafeeq");
    res.cookie("user", { encript }, { httpOnly: true, maxAge: 0 });
    res.status(200).json("logout");
  },
  deleteAccount: async (req, res) => {
    try {
      const usr = await scheema.findById({ _id: req.body.jwtid });
      bcript.compare(req.body.password, usr.password).then(async (pass) => {
        if (pass) {
          await scheema.deleteOne({ _id: req.body.jwtid });
          const encript = jwt.sign({ id: req.body.jwtid }, "shafeeq");
          res.cookie("user", { encript }, { httpOnly: true, maxAge: 0 });
          res.status(200).json("account deleted sucsess fully");
        } else {
          res.status(400).json("please check your password");
        }
      });
    } catch (error) {
      res.status(404).json("error somthing went wrong");
    }
  },
  pay:async (req,res)=>{
    try {
        const rescipt = 1000+Math.floor(Math.random()*8999)
    razonpay.orders.create({ 
        amount:req.body.amount,
        currency:"INR",
        receipt:rescipt
    }).then((order)=>{console.log(order)
        res.json(order.id)
    })
    } catch (error) {
        res.status(404).json("something went wrong")
    }
  },
  verify:(req,res)=>{
    try {
        console.log(req.body);
    const {razorpay_payment_id,razorpay_order_id,razorpay_signature}=req.body
    const compaired = crypto.createHmac('sha256',process.env.key_secret)
    .update(razorpay_order_id +"|"+razorpay_payment_id)
    .digest("hex")
    console.log(compaired,);
    if(compaired==razorpay_signature){
        res.status(200).json("payment sucssess")
    }else{res.status(400).json("payment failed")}
    res.end()
    } catch (error) {
        res.status(404).json("something went wrong")
    }
  }
};

// const product = await vendoscheema.find({_id:req.body.vid},{
// product:{$elemMatch:{_id:req.body.pid}}
// })
// ({_id:"642e5040c3ae9564a87e8ddd","product._id":"642e5ce3ce1527d52c26bc9f"})
// console.log(product[0].product);
