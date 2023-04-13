const scheema = require('../../model/addVendorScheema')
const itemscheema = require('../../model/itemScheema')
const bcript = require('bcrypt')
const jwt = require('jsonwebtoken')

module.exports = {
    login:{
    post:async(req,res)=>{
        try {
            const exist =await scheema.find({v_username:req.body.username})
            const pwd = await bcript.compare(req.body.password,exist[0].v_password).then((pwd)=> pwd)
            console.log(pwd)
            if(exist.length == 1 && pwd){
                const encod = jwt.sign({id:exist[0]._id},"shafeeq")
                console.log(encod);
                res.cookie("vendor",{encod},{httpOnly:true})
            res.send('200:ok , login sucsess')
        }else{
            res.send('404:error , vendor not exist')
        }
        } catch (error) {
            res.send('404:error , internal error')
        }
    }
},

// profile update
profile:{
    get:async(req,res)=>{    
     const vendor = await scheema.find({_id:req.body.jwtid})
     res.status(200).json(vendor)
    },
    put:async(req,res)=>{
      try {
        const decode = await req.body.id;
        console.log(req.body.id);
        const exist = await scheema.find({_id:decode})
      
       if(exist.length){
        console.log(exist[0].product);
        res.status(200).json(exist[0].product)
       }
      } catch (error) {
        res.status(200).send('404 not fount')
      }  
    }
},

//products 
product:{
    get: async(req, res) => {
        const data = await scheema.find({_id:req.body.jwtid},{product:1})
        res.status(200).json(data)
      },
     
      put: async (req, res) => {
        try {
          const decode = req.body.jwtid
          const exist = await scheema.find({ _id: decode });
          
          if (exist.length == 1) {
            const item = req.body.name
            const icode =await itemscheema.find({i_name:item})
            console.log(icode[0].i_code);
            const a = await scheema.updateOne(
              { _id: decode },
              {
                $push: {
                  product: {
                    name:req.body.name,
                    price:req.body.price,
                    qnty:req.body.qnty,
                    img:req.body.img,
                    itemcode:icode[0].i_code
                  },
                },
              }
            );
            res.status(200).json("ok");
          }
        } catch (error) {res.status(400).send("error")}
      },
    delete:async(req,res)=>{
      console.log(req.body);
      const stat = await scheema.updateOne({_id:req.body.jwtid},{$pull:{product:{_id:req.body.productid}}})
      console.log(stat);
      res.end()
    }
},
order:{
    get:(req,res)=>{
        res.status(200).send('200:ok')
    },
    post:(req,res)=>{
      
        res.status(200).send('200:ok , ')
    },
    put:(req,res)=>{
        res.status(200).send('200:ok')
    }
},
logout:async(req,res)=>{
  const encod = await jwt.sign({id:req.body.jwtid},"shafeeq")
  res.cookie("vendor",{encod},{maxAge:0,httpOnly:true})
  res.end()
}
}