const bcript = require('bcrypt')
const scheema = require('../../model/customerscheema')
const productScheema = require('../../model/addVendorScheema')
const jwt = require('jsonwebtoken')
const salt = 10

module.exports = {
    //coustomer signup
    
    signup:async(req,res)=>{
            console.log(req.body);
            const encript = await bcript.hash(req.body.password,salt)
            console.log(encript);
            scheema({
                name:req.body.name,
                username:req.body.username,
                password:encript,
                email:req.body.email
            }).save()
            res.status(200).send('ok')
        },
    
//coustomer login
    getuser:async(req,res)=>{
        try {
            const data = await productScheema.find({},{product:1})
            res.json(data)
        } catch (error) {
            res.send('error')
        }
      
    },
    login:async(req,res)=>{
        try {
            // console.log(req.body);
            const exist = await scheema.find({username:req.body.username})
            // console.log(exist);
            if(exist.length == 1){
                bcript.compare(req.body.password,exist[0].password).then((pwd)=>{
                    if(pwd){
                        const encript = jwt.sign({id:exist[0]._id},"shafeeq")
                        res.cookie("user",{encript},{httpOnly:true})
                        res.status(200).send('login sucsess')
                    }else{res.status(404).send('password error')}
                })
            }else{res.status(404).send('username not exist')}
        
        } catch (error) {
            res.status(404).send('internal error')
        }
    },
    edit:async(req,res)=>{
        const usr = await scheema.find({_id:req.body.jwtid})
        console.log(usr);
        res.status(200)
    },

//coustomer select vendors
select:async(req,res)=>{
        console.log(req.body.vendor);
       const data = await productScheema.find({_id:req.body.vendor},{password:0})
       console.log(data);
        res.status(200).json(data)
  
},

//product add to cart

    getcart:async(req,res)=>{
        const cart = await scheema.find({_id:req.body.jwtid},{cart:1})
        console.log(cart);
        res.status(200).json(cart)
    },

    postcart:async(req,res)=>{
        try {
            const {vid,pid}=req.body
            const product = await productScheema.find({ "product._id": pid }  , { "product.$": 1 })
            console.log(product);
            const id = req.body.id
            const user = await scheema.find({_id:id})
            console.log(user);
    
              if(user){
                const cart= await  scheema.find({"cart.pid":pid},{"cart.$":1})
                if(cart.length == 0){
               const data =  await scheema.updateMany({_id:id},
                {$push:{cart:{name:product[0].product[0].name,
                price:product[0].product[0].price,
                qnty:product[0].product[0].qnty,
                img:product[0].product[0].img,
                itemcode:product[0].product[0].itemcode,
                pid:product[0].product[0]._id,
                vid:product[0]._id
            }}});

               console.log(data,"if nte ullil");
             res.status(200).json('ok....if nte ulli')
              }else{
               const cart = await  scheema.updateOne({$and:[{_id:user[0]._id},{"cart.pid":pid}]},{$inc:{"cart.$.qnty":1}})
                res.status(200).json('ok... elseil')
                console.log(cart);
              }
            }
        } catch (error) {
            console.log(error);
            res.send("error")
            
        }  
    },
    delete:async(req,res)=>{

    },


    orders:async(req,res)=>{
        try {
            console.log(req.body);
            const usr = req.body
            console.log(usr);
           const user = await scheema.find({_id:usr})
           console.log(user);
            res.status(200).send("order")
            
        } catch (error) {
            console.log("error");
        }
        
    },
    logout:async(req,res)=>{
    console.log();
    const encript = jwt.sign({id:req.body.jwtid},"shafeeq")
    res.cookie("user",{encript},{httpOnly:true,maxAge:0})
    res.status(200).json('logout')
}

}

// const product = await vendoscheema.find({_id:req.body.vid},{
    // product:{$elemMatch:{_id:req.body.pid}}
// })
// ({_id:"642e5040c3ae9564a87e8ddd","product._id":"642e5ce3ce1527d52c26bc9f"})
// console.log(product[0].product);