const UserModel = require('../models/user_model');
const bcrypt = require('bcrypt');
const {genrateToken} = require('../utils/genrateToken');
const {verifyToken} = require('../utils/verifyToken');

const UserController={
    signUp:async function(req,res) {
        try {
            const data = req.body;
            const findUser = await UserModel.findOne({"email":data.email});

            if(data.role === 'ADMIN')
            {
                const response = { success: false,message: "User Already Exists" };
                return res.status(401).json(response); 
            }
            if(findUser)
            {
                const response = { success: false,message: "User Already Exists" };
                return res.status(401).json(response); 
            }

            const user = new UserModel(data);
            await user.save();

            const token = genrateToken(user._id);

            const response = { success: true ,message: "Signup Successfully",token: token };
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
            const response = { success: true ,message: "Signin Successfully",token: token };
            return res.status(200).json(response); 
        } catch (error) {
            const response = { success: false,message: error.message };
            return res.status(400).json(response);
        }
    },
    userData:async function(req,res){
        try {
            const token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                return res.status(401).json({ success: false, message: "invalid user" });
            }
            const userTokenData = verifyToken(token);
            if (!userTokenData.id) {
                return res.status(401).json({ success: false, message: "invalid user" });
            }
            const userId = userTokenData.id;
            const user = await UserModel.findById(userId);
            if (!user) {
                return res.status(401).json({ success: false, message: "invalid user" });
            }
            const response = { success: true, data: user };
            return res.status(200).json(response);

        } catch (error) {
            const response = { success: false,message: error.message };
            return res.status(400).json(response);
        }
    }
}

module.exports = UserController