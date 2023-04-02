const mongoose = require('mongoose')

const scheema = new mongoose.Schema({
    username:{
        type:String
    },
    password:{
        type:String
    },
    phone:{
        type:String
    },
    email:{
        type:String
    }
})

module.exports = mongoose.model("admin",scheema)