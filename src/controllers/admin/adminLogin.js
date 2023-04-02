const scheema = require('../../model/adminScheema')
const bcript = require('bcrypt')
const salt = 10

module.exports ={
    get:(req,res)=>{
        res.send('200:ok , login')
    },
    post:async(req,res)=>{
        const exist = await scheema({username:req.body.username})
        if(exist.length == 1){
            bcript.compare(req.body.password,exist[0].password).then((pwd)=>{
                if(pwd){res.send('200:ok , login Sucsessfull')}
                else{res.send('404:error , please check your password')}
            })

        }else{res.send('404:error , username not fount')}

    },
    put: async(req,res)=>{
        const exist = await scheema.find({username:req.body.username})
        const pwd = await bcript.hash(req.body.password,salt)
        if(exist.length == 1){
            await scheema.updateOne({
                password: await pwd,
                phone:req.body.phone,
                email:req.body.email
            })
            res.send('200:ok , sucsessfully update admin details')
        }else(res.send('404:error , admin not fount'))

    }
}
