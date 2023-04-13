
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
            required:true,
            type:String
        },
        pid:{
            required:true,
            type:String
        },
        vid:{
            required:true,
            type:String
        }
       
    }],
    orders:[{
        name:{type:String},
        qnty:{type:Number},
        totalamt:{type:Number},
        itemcode:{type:String},
        status:{type:String}

    }]
})

module.exports = mongoose.model("user",scheema)