const DishModel = require('../models/dish_model');
const UserModel = require('../models/user_model');
const { uploads, destroy } = require('../middlewares/cloudinary');

const { verifyToken } = require('../utils/verifyToken');

const DishController = {
    insertDish: async function (req, res) {
        try {
            const token = req.headers['authorization'];
            if (!token) {
                const response = { success: false, message: "You Not Add Food Dish" };
                return res.status(401).json(response);
            }
            const adminTokenData = verifyToken(token);
            if (!adminTokenData) {
                const response = { success: false, message: "You Not Add Food Dish" };
                return res.status(401).json(response);
            }
            const adminId = adminTokenData.id;
            const adminData = await UserModel.findById(adminId);
            if (!adminData) {
                const response = { success: false, message: "You Not Add Food Dish" };
                return res.status(401).json(response);
            }
            const role = adminData.role;
            if (role === 'ADMIN') {
                const data = req.body;
                let image = null;
                let publicUrl = null;
                const path = req.file?.path;
                if (path) {
                    const result = await uploads(path, 'dishes');
                    image = result.secure_url;
                    publicUrl = result.public_id;
                    const dishes = new DishModel({ ...data, image, publicUrl });
                    await dishes.save();
                    const response = { success: true, data: dishes, message: "Dish add successfully" }
                    return res.status(200).json(response);
                }
                else
                {
                    const response = { success: false, message: "Image is required" };
                    return res.status(403).json(response);
                }
            }
            else {
                const response = { success: false, message: "You Not Add Food Dish" };
                return res.status(401).json(response);
            }

        } catch (error) {
            const response = { success: false, message: error.message };
            return res.status(400).json(response);
        }
    }
}

module.exports = DishController;