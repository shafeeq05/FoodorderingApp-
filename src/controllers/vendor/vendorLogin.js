const scheema = require('../../model/addVendorScheema')
const bcript = require('bcrypt')

module.exports = {
    get:(req,res)=>{
        res.send('200:ok , vendor Login')
    },
    post:async(req,res)=>{
        const exist =await scheema.find({v_username:req.body.username})
        const pwd = await bcript.compare(req.body.password,exist[0].v_password).then((pwd)=> pwd)
        console.log(pwd)
        if(exist.length == 1 && pwd){
        res.send('200:ok , login sucsess')
    }else{
        res.send('404:error , vendor not exist')
    }
    }
}