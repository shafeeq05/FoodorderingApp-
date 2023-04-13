const mongoose = require('mongoose')

const scheema = new mongoose.Schema({
    v_name:{
        type:String,
        required:true
    },
    v_username:{
        type:String,
        unique:true,
        required:true
    },
    v_password:{
        type:String,
        required:true
    },
    v_phone:{
        type:String,
        required:true
    },
    product:[{
        name:{
           type:String,
           required:true
        },
        price:{
            type:Number,
            required:true
        },
        qnty:{
            type:Number,
            required:true
        },
        img:{
            type:String,
            required:true
        },
        itemcode:{
            type:String,
            required:true
        }
        
    }]
})

module.exports = mongoose.model("vendor",scheema)