const mongoose = require('mongoose')

const scheema = new mongoose.Schema({
    v_name:{
        type:String
    },
    v_username:{
        type:String
    },
    v_password:{
        type:String
    },
    v_phone:{
        type:String
    }
})

module.exports = mongoose.model("vendor",scheema)