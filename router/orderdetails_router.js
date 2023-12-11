const { Router } = require('express');
const OrderController = require('../controller/orderdetails_controller');
const router = Router();

router.post('/insert-details',OrderController.insertDetails);

module.exports = router;