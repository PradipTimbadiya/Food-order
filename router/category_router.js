const { Router } = require('express');
const CategoryController = require('../controller/category_controller');
const router =Router();

router.post('/insert-category' , CategoryController.insertCategory);

router.get('/display-category' , CategoryController.displayCategory);

router.put('/update-category/:id' , CategoryController.updateCategory);

router.delete('/delete-category/:id' , CategoryController.deleteCategory);

module.exports = router;