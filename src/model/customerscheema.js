
const mongoose = require('mongoose')

const scheema =  mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    cart:[{
        // product:{
        //    type: String,
        //    required:true
        // },
       
    }]
})

module.exports = mongoose.model("user",scheema)