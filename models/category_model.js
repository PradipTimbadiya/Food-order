const mongoose = require('mongoose');

const Category = mongoose.Schema({
    name:{
        type:String,
        require:true
    }
},{
    timestamps:true,
    toJSON:{
        transform:function(_doc,ret,_option){
            delete ret._id
        },
        virtuals: true,
        versionKey :false
    }
});

const CategoryModel = mongoose.model("category",Category);

module.exports=CategoryModel;