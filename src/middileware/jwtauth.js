const jwt = require('jsonwebtoken')
const scheema = require('../model/adminScheema')

module.exports.auth = {
admin : async(req,res,next) =>{
    try {
        const jwtdecode =  req.cookies.adminLogin.tocken
const decoded =  jwt.verify(jwtdecode,'shafeeq') 
 console.log(decoded.id);
 next()
   
    } catch (error) {
        res.status(200).send('404:error invalid user')
        
    }

},
vendor:
    async(req,res,next)=>{
        try {
              // console.log(req.cookies.vendor.encod);
        const decode = jwt.verify(req.cookies.vendor.encod,"shafeeq")
        console.log(decode);
        next()
            
        } catch (error) {
            
        }
      
},
coustomer:
async (req,res,next)=>{
    try {
        const encode = req.cookies.user.encript
    const decode = await jwt.verify(encode,"shafeeq").id
    const exist = await scheema.find({_id:decode})
    // console.log(exist);
    next()
    return decode
    } catch (error) {
        res.status(404).json({status:"unautherised user"})
    } 
}
}
