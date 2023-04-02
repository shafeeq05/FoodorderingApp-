const mongoose = require('mongoose')

const scheema = new mongoose.Schema({
    i_name:{
        type:String
    },
    i_catogery:{
        type:String
    },
    i_code:{
        type:String
    }
})

module.exports = mongoose.model("catogerie",scheema)