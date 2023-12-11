const CategoryModel = require('../models/category_model');
const UserModel = require('../models/user_model');
const {verifyToken} = require('../utils/verifyToken');

const CategoryController ={
    insertCategory:async function(req,res){
        try {
            const token = req.headers['authorization']?.split(' ')[1];
            if (!token) {
                const response = { success: false, message: "You Not Add Food Category" };
                return res.status(401).json(response);
            }
            const adminTokenData = verifyToken(token);
            if (!adminTokenData) {
                const response = { success: false, message: "You Not Add Food Category" };
                return res.status(401).json(response);
            }
            const adminId = adminTokenData.id;
            const adminData = await UserModel.findById(adminId);
            if (!adminData) {
                const response = { success: false, message: "You Not Add Food Category" };
                return res.status(401).json(response);
            }
            const role = adminData.role;
            if(role !== 'ADMIN')
            {
                const response = { success: false, message: "You Not Add Food Category" };
                return res.status(401).json(response);
            }

            const data = req.body;
            const category = await CategoryModel(data);
            await category.save();

            const response = { success: true, data:category, message: "Category add successfully" };
            return res.status(200).json(response);
           
        } catch (error) {
            const response = { success: false, message: error.message };
            return res.status(400).json(response);
        }
    },
    displayCategory:async function(req,res){
        try {
            const category = await CategoryModel.find();
            const categories = category.map((e)=>e);

            const response = { success: true, data:categories};
            return res.status(200).json(response);
           
        } catch (error) {
            const response = { success: false, message: error.message };
            return res.status(400).json(response);
        }
    },
    updateCategory:async function(req,res){
        try {
            const token = req.headers['authorization']?.split(' ')[1];
            
            if (!token) {
                const response = { success: false, message: "You Not update Food Category" };
                return res.status(401).json(response);
            }
            const adminTokenData = verifyToken(token);
            if (!adminTokenData) {
                const response = { success: false, message: "You Not update Food Category" };
                return res.status(401).json(response);
            }
            const adminId = adminTokenData.id;
            const adminData = await UserModel.findById(adminId);
            if (!adminData) {
                const response = { success: false, message: "You Not update Food Category" };
                return res.status(401).json(response);
            }
            const role = adminData.role;
            if(role !== 'ADMIN')
            {
                const response = { success: false, message: "You Not update Food Category" };
                return res.status(401).json(response);
            }

            const id = req.params.id;
            const category = await CategoryModel.findById(id);
            if(!category)
            {
                const response = { success: false, message: "Categor Not Found" };
                return res.status(401).json(response);
            }

            category.name = req.body.name;
            await category.save();

            const response = { success: true, data:category, message: "Category update successfully" };
            return res.status(200).json(response);
           
        } catch (error) {
            const response = { success: false, message: error.message };
            return res.status(400).json(response);
        }
    },
    deleteCategory:async function(req,res){
        try {
            const token = req.headers['authorization']?.split(' ')[1];
            
            if (!token) {
                const response = { success: false, message: "You Not delete Food Category" };
                return res.status(401).json(response);
            }
            const adminTokenData = verifyToken(token);
            if (!adminTokenData) {
                const response = { success: false, message: "You Not delete Food Category" };
                return res.status(401).json(response);
            }
            const adminId = adminTokenData.id;
            const adminData = await UserModel.findById(adminId);
            if (!adminData) {
                const response = { success: false, message: "You Not delete Food Category" };
                return res.status(401).json(response);
            }
            const role = adminData.role;
            if(role !== 'ADMIN')
            {
                const response = { success: false, message: "You Not delete Food Category" };
                return res.status(401).json(response);
            }

            const id = req.params.id;
            const category = await CategoryModel.findByIdAndDelete(id);
            if(!category)
            {
                const response = { success: false, message: "Categor Not Found" };
                return res.status(401).json(response);
            }

            const response = { success: true, data:category, message: "Category delete successfully" };
            return res.status(200).json(response);
           
        } catch (error) {
            const response = { success: false, message: error.message };
            return res.status(400).json(response);
        }
    }
}

module.exports = CategoryController;