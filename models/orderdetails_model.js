const mongoose = require('mongoose');

const Order = mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    mobileNo:{
        type:String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
    city:{
        type:String,
        required:true
    },
    pincode:{
        type:String,
        required:true
    }
},{
    timestamps:true,
    toJSON:{
        transform:function(_doc,ret,_option){
            delete ret._id;
        },
        virtuals: true,
        versionKey :false
    }
});

const OrderDetail = mongoose.model("orderdetails" , Order);

module.exports = OrderDetail;