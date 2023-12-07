const UserModel = require('../models/user_model');
const bcrypt = require('bcrypt');
const {genrateToken} = require('../utils/genrateToken');

const UserController={
    signUp:async function(req,res) {
        try {
            const data = req.body;
            const findUser = await UserModel.findOne({"email":data.email});
            if(findUser)
            {
                const response = { success: false,message: "User Already Exists" };
                return res.status(401).json(response); 
            }
            const user = new UserModel(data);
            await user.save();

            const token = genrateToken(user._id);

            const response = { success: true,data:user ,message: "Signup Successfully",token: token };
            return res.status(200).json(response); 
        } catch (error) {
            const response = { success: false,message: error.message };
            return res.status(400).json(response);
        }
    },
    signIn:async function(req,res){
        try {
            const data = req.body;
            const findUser = await UserModel.findOne({"email":data.email});
            if(!findUser)
            {
                const response = { success: false,message: "User Not Exists" };
                return res.status(401).json(response);
            }
            const matchPass = await bcrypt.compare(data.password,findUser.password);
            if(!matchPass)
            {
                const response = { success: false,message: "User Not Exists" };
                return res.status(401).json(response);
            }
            const token = genrateToken(findUser._id)
            const response = { success: true,data:findUser ,message: "Signin Successfully",token: token };
            return res.status(200).json(response); 
        } catch (error) {
            const response = { success: false,message: error.message };
            return res.status(400).json(response);
        }
    }
}

module.exports = UserController