const { Router } = require('express');
const DishController = require('../controller/dish_controller');
const {multer} = require('../middlewares/multer');
const router = Router();

router.post('/insert-dish',multer.single('image'),DishController.insertDish);

module.exports=router