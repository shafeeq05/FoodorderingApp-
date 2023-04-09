const bcript = require('bcrypt')
const scheema = require('../../model/customerscheema')
const productScheema = require('../../model/addVendorScheema')
const jwt = require('jsonwebtoken')
const salt = 10

module.exports = {
    //coustomer signup
    signup:{
        post:async(req,res)=>{
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
        }
    },
//coustomer login
    login:{
    get:async(req,res)=>{
        try {
            const data = await productScheema.find({},{product:1})
            res.json(data)
        } catch (error) {
            res.send('error')
        }
      
    },
    post:async(req,res)=>{
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
    put:(req,res)=>{
        res.status(200)
    }
},
//coustomer select vendors
select:{
    post:async(req,res)=>{
        console.log(req.body.vendor);
       const data = await scheema.find({v_username:req.body.vendor})
       
        res.status(200).json(data)
  
}
},
//product add to cart
cart:{
    get:async(req,res)=>{
        const id = jwt.verify(req.cookies.user.encript,'shafeeq').id
        const cart = await scheema.find({_id:id},{cart:{_id:"642f9e9b8ea4c842fd043f03"}})
        console.log(cart);
        res.send('cart')
    },

    post:async(req,res)=>{
        try {
            const {vid,pid}=req.body
            const product = await productScheema.find({ "product._id": pid }  , { "product.$": 1 })
            console.log(product[0]._id,"product",product[0].product[0]);
            const id = jwt.verify(req.cookies.user.encript,'shafeeq').id
            const user = await scheema.find({_id:id})
            
            
              if(user){
                const qnty = await scheema.find({_id:id},{cart:{qnty:1}});
                console.log(qnty[0].cart,"user cart");
            //    const data =  await scheema.updateOne({_id:id},{$push:{cart:product[0].product[0]}});

            //    console.log(data,"if nte ullil");
             res.send('ok')
              }
        } catch (error) {
            console.log(error);
            res.send("error")
            
        }  
    } 
}

}

// const product = await vendoscheema.find({_id:req.body.vid},{
    // product:{$elemMatch:{_id:req.body.pid}}
// })
// ({_id:"642e5040c3ae9564a87e8ddd","product._id":"642e5ce3ce1527d52c26bc9f"})
// console.log(product[0].product);