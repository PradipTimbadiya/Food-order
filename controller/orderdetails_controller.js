const OrderDetails = require('../models/orderdetails_model');
const {verifyToken} = require('../utils/verifyToken');

const OrderController = {
    insertDetails:async function(req,res){
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
            
            const data = req.body;
            const orderDetails = new OrderDetails(data);
            await orderDetails.save();

            const response = { success: true, data:orderDetails,message: "Order details submited" };
            return res.status(200).json(response);

        } catch (error) {
            const response = { success: false,message: error.message };
            return res.status(400).json(response);
        }
    }
}

module.exports = OrderController;