const { Router } = require('express');
const DishController = require('../controller/dish_controller');
const {multer} = require('../middlewares/multer');
const router = Router();

router.post('/insert-dish',multer.single('image'),DishController.insertDish);

router.get('/get-dish',DishController.getDish);

router.put('/update-dish',multer.single('image'),DishController.updateDish);

router.delete('/delete-dish',DishController.deleteDish);

module.exports=router