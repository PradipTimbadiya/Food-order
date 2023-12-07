const mongoose = require('mongoose');

const Dish = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    price:{
        type:String,
        required:true
    },
    image:{
        type:String,
        default:null
    },
    publicUrl:{
        type:String,
        default:null
    }
},
{
    timestamps:true,
    toJSON:{
        transform:function(_doc,ret,_option){
            delete ret._id
            delete ret.publicUrl
        },
        virtuals: true,
        versionKey :false
    }
});

const DishModel = mongoose.model("dish",Dish);

module.exports=DishModel

