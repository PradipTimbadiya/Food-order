const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const User = mongoose.Schema({
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
    password:{
        type:String,
        required:true
    },
    createdAt:{
        type:Date,
        default:Date.now()
    },
    updatedAt:{
        type:Date,
        default:Date.now()
    },
    image:{
        type:String,
        default:null
    },
    publicUrl:{
        type:String,
        default:null
    },
    role:{
        type:String,
        enum:['USER','ADMIN'],
        default:'USER'
    },
    address:{
        type:String,
        default:null
    },
    
},
{
    timestamps:true,
    toJSON:{
        transform:function(_doc,ret,_option){
            delete ret.password;
            delete ret.role;
            delete ret.publicUrl;
            delete ret._id;
        },
        virtuals: true,
        versionKey :false
    }
})

// User.methods.getData = function(){
//     return{
//         id:this._id,
//         name:this.name,
//         email:this.email,
//         mobileNo:this.mobileNo,
//         image:this.image,
//         createdAt:this.createdAt,
//         updatedAt:this.updatedAt
//     }
// }

User.pre('save',async function(next){
    if(this.isModified('password'))
    {
        const salt = bcrypt.genSaltSync(10);
        this.password=await bcrypt.hash(this.password,salt);
    }
    next();
})

const UserModel = mongoose.model('user',User);

module.exports = UserModel;