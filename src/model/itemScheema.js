const mongoose = require('mongoose')

const scheema = new mongoose.Schema({
    i_name:{
        type:String,
        required:true
    },
    i_catogery:{
        type:String,
        required:true
    },
    i_code:{
        type:String,
        unique:true,
        required:true
    }
})

module.exports = mongoose.model("catogerie",scheema)