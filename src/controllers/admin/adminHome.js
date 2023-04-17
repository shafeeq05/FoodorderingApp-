const adminScheema = require("../../model/adminScheema");
const jwt = require("jsonwebtoken");
const bcript = require("bcrypt");
const itemScheema = require("../../model/itemScheema");
const vendorScheema = require("../../model/addVendorScheema");
const userScheema = require('../../model/customerscheema')
const salt = 10;

module.exports = {
  //-----------------admin login-----------------------------
  login:{
    //get  profile
    get: async (req, res) => {
      const admin = await adminScheema.find({ _id: req.body.jwtid });
      res.status(200).send(admin);
    },
    //login
    post: async (req, res) => {
      const exist = await adminScheema.find({ username: req.body.username });
      // console.log(exist);
      if (exist.length) {
        bcript.compare(req.body.password, exist[0].password).then((pwd) => {
          if (pwd) {
            const tocken = jwt.sign({ id: exist[0]._id }, "shafeeq");
            // console.log(tocken);
            res.cookie("adminLogin", { tocken }, { httpOnly: true });
            res.status(200).send("200:ok , login Sucsessfull");
          } else {
            res.satatus(400).send("400:error , please check your password");
          }
        });
      } else {
        res.send("404:error , username not fount");
      }
    },
    //update profile
    put: async (req, res) => {
      try {
        console.log(req.body.id);
      const exist = await adminScheema.find({ _id: req.body.jwtid });
      // const pwd = await bcript.hash(req.body.password,salt)
      if (exist.length == 1) {
        await adminScheema.updateOne({
          // password: await pwd,
          username:req.body.username,
          phone: req.body.phone,
          email: req.body.email,
        });
        res.status(200).send(" sucsessfully update admin details");
      } else {res.staus(400).send(" admin not fount")}
        
      } catch (error) {
        res.staus(404).send(" admin not fount");
      }
    },
  },
  //------------------get orders---------------------
  order: {
    get: async(req, res) => {
      try {
        const user = await userScheema.find({},{orders:1})
        console.log(user);
        res.status(200).json(user);
      } catch (error) {
        
      }
      
    },
  },
  //--------------------------get users --------------------------
  user: {
    //get user
    get: async (req, res) => {
      try {
        const user = await userScheema.find({},{cart:0,orders:0})
        res.status(200).json(user);
      } catch (error) {
        res.status(404).json("somthing went wrong");
      }
     
    },
    //delete user
    delete:async(req,res)=>{
      try {
        await userScheema.deleteOne({_id:req.body.id})
        res.status(200).json(
          
        )
      } catch (error) {
        
      }
    }
  },
//---------------------cateogery operations---------------------------
  catogery: {
    //admin show catogery
    get: async (req, res) => {
      const data = await itemScheema.find();
      res.status(200).json(data);
    },
    //admin add catogery
    post: async (req, res) => {
      try {
        const exist = await itemScheema.find({ i_code: req.body.code });
        if (exist.length == 0) {
          await itemScheema.insertMany({
            i_name: req.body.itemname,
            i_catogery: req.body.itemcatogery,
            i_code: req.body.itemcode,
          });
          res.status(200).send("200:ok , item added sucsessfully");
        } else {
          res.status(409).send("409:error , item already exist");
        }
      } catch (error) {
        res.status(404).send("404:error ");
      }
    },
    //admin edit catogery
    put: async (req, res) => {
      try {
        const exist = await itemScheema.find({ _id: req.body.id });
      console.log(exist[0]);
      if (exist.length == 1) {
       const update =  await itemScheema.updateOne(
          { _id: req.body.id },
          { i_name: req.body.itemname, i_catogery: req.body.itemcatogery }
        );
        console.log(update);
        res.status(200).send("200:ok , item updated scsussfully");
      } else {
        res.status(404).send("error , item not exist");
      }
        
      } catch (error) {
        res.status(400).send("something went wrong");
      }
    },
    //admin delete catogery
    delete: async (req, res) => {
     try {
      const exist = await itemScheema.find({ _id: req.body.id });
      if (exist.length == 1) {
        await itemScheema.deleteOne({ _id: req.body.id });
        res.status(200).send("200:0k , deleted catogery sucsessfully");
      } else {
        res.status(404).send("item not fount");
      }
     } catch (error) {  
      res.status(400).send(" item not fount");
     }
    },
  },
  //----------------------vendors operations-------------------
  vendor: {
    //admin show the vendors
    get: async (req, res) => {
      const users = await vendorScheema.find({},{v_password:0});
      res.status(200).json(users);
    },
    //admin add the vendors
    post: async (req, res) => {
      try {
        const exist = await vendorScheema.find({
          v_username: req.body.username,
        });
        const pwd = await bcript
          .hash(req.body.password, salt)
          .then((pwd) => pwd);
        if (exist.length == 0) {
          await vendorScheema({
            v_name: req.body.name,
            v_username: req.body.username,
            v_password: await pwd,
            v_phone: req.body.phone,
          }).save();
          res.status(200).json({ status: "sucsess" });
        } else {
          res.status(404).json({ status: "error , username already exist" });
        }
      } catch (error) {
        res.status(403).json({ status: "sucsError" });
      }
    },
    //admin update the vendor details
    put: async (req, res) => {
      try {
        const exist = await vendorScheema.find({
          _id: req.body.id,
        });
        
        if (exist.length == 1) {
          if(req.body.password){
            const pwd = await bcript
              .hash(req.body.password, salt)
              .then((pwd) => pwd);

          await vendorScheema.updateOne(
            { _id: req.body.id },
            {
              v_username: req.body.username,
              v_name: req.body.name,
              v_password: await pwd ,
              v_phone: req.body.phone,
            }
          );
          res
            .status(200)
            .send("200:ok , sucsessfully updated the vendor details");
        } else {

          await vendorScheema.updateOne(
            { _id: req.body.id },
            {
              v_username: req.body.username,
              v_name: req.body.name,
              v_phone: req.body.phone,
            }
          );
          res
            .status(200)
            .send("200:ok , sucsessfully updated the vendor details");

        }
      }else{
        res.satatus(404).send("404:error , user not fount");
      }
      } catch (error) {
        res.status(404).send("somthing went wrong");
      }
    },
    //delete vendors
      delete:async(req,res)=>{
        try {
          const dele = await vendorScheema.deleteOne({_id:req.body.id})
          console.log(dele);
          if(dele.deletedCount!=0){
            res.status(200).json('deleted success fully')
          }else{
            res.status(404).json('vendor not found')
          }
         

        } catch (error) {
          console.log(error);
          res.status(400).json('cath eroorrrr.........')
        }

    }
  },
    logout: {
      get: (req, res) => {
        console.log(req.body.jwtid);
        const tocken = jwt.sign({ id: req.body.jwtid }, "shafeeq");
        res.cookie("adminLogin", { tocken }, { httpOnly: true, maxAge: 0 });
        res.status(200).json("logout");
      },
    },
};
