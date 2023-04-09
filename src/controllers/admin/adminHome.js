const adminScheema = require('../../model/adminScheema')
const jwt = require('jsonwebtoken')
const bcript = require('bcrypt')
const itemScheema = require("../../model/itemScheema");
const vendorScheema = require("../../model/addVendorScheema");
const salt = 10


module.exports = {
    login:{
    //admin login
    get:(req,res)=>{
        res.send('200:ok , login')
    },
    post:async(req,res)=>{
        const exist = await adminScheema.find({username:req.body.username})
        // console.log(exist);
        if(exist.length){
            bcript.compare(req.body.password,exist[0].password).then((pwd)=>{
                
                if(pwd){
                    
                const tocken = jwt.sign({id:exist[0]._id},'shafeeq')
                // console.log(tocken);
                res.cookie('adminLogin',{tocken},{httpOnly:true})
                res.send('200:ok , login Sucsessfull')
            }
                else{res.send('404:error , please check your password')}
            })

        }else{res.send('404:error , username not fount')}

    },
    put: async(req,res)=>{
        const exist = await adminScheema.find({username:req.body.username})
        const pwd = await bcript.hash(req.body.password,salt)
        if(exist.length == 1){
            await adminScheema.updateOne({
                password: await pwd,
                phone:req.body.phone,
                email:req.body.email
            })
            res.send('200:ok , sucsessfully update admin details')
        }else(res.send('404:error , admin not fount'))

    },
},

order:{

    get:(req,res)=>{
        res.status(200).send('200:ok , orders')
    }, 
},
user:{
    get:(req,res)=>{
        res.status(200).send('200:ok , users')
    },
},

catogery:{
 //admin show catogery
 get: async(req, res) => {
    const data = await itemScheema.find()
    res.status(200).json(data)
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
      res.status(404).send('404:error ')
      
    }
    
    
  },
  //admin edit catogery
  put:async (req, res) => {
    const exist = await itemScheema.find({i_code:req.body.itemcode}) 
    if(exist.length == 1){
        await itemScheema.updateOne({i_code:req.body.itemcode},{i_name:req.body.itemname,i_catogery:req.body.itemcatogery})
        res.status(200).send('200:ok , item updated scsussfully')
    }else{
        res.status(200).send("404:error , item not exist");

    }
  },
  //admin delete catogery
  delete:async (req, res) => {
    const exist = await itemScheema.find({i_code:req.body.itemcode}) 
    if(exist.length == 1){
        await itemScheema.deleteOne({i_code:req.body.itemcode})
    res.status(200).send("200:0k , deleted catogery sucsessfully");
    }else{
        res.send('404:error , item not fount')
    }
  },
},
vendor:{
//admin show the vendors
  get:async(req, res) => {
    const users = await vendorScheema.find()
    res.status(200).json(users)
  },
  //admin add the vendors
  post: async (req, res) => {
    
      try {
        const exist = await vendorScheema.find({ v_username: req.body.username });
    const pwd = await bcript.hash(req.body.password, salt).then((pwd) => pwd);
    if (exist.length == 0) {
      await vendorScheema({
        v_name: req.body.name,
        v_username: req.body.username,
        v_password: await pwd,
        v_phone: req.body.phone,
      }).save();
      res.status(200).json({"status":"sucsess"});
    } else {
      res.status(404).json({"status":"error , username already exist"});
    }
        
      } catch (error) {
        res.status(403).json({"status":"sucsError"})
      }

   
  },
  //admin update the vendor details
  put: async (req, res) => {
    try {

    const exist = await vendorScheema.find({ v_username: req.body.username });
    const pwd = await bcript.hash(req.body.password, salt).then((pwd) => pwd);
    if (exist.length == 1) {
      await vendorScheema.updateOne(
        { v_username: req.body.username },
        {
          v_name: req.body.name,
          v_password: await pwd,
          v_phone: req.body.phone,
        }
      );
      res.status(200).send('200:ok , sucsessfully updated the vendor details')
    }else(res.satatus(404).send('404:error , user not fount'))
      
    } catch (error) {
      res.status(404).send("Error")
    }

  },
  delete:(req,res)=>{

  }

},

}
