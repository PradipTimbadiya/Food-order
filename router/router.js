const userRouter=require('../router/user_router');
const dishRouter=require('../router/dish_router');
const categoryRouter=require('../router/category_router');
const orderrouter=require('../router/orderdetails_router');
const { Router } = require('express');
const router=Router();

router.use(userRouter);
router.use(dishRouter);
router.use(categoryRouter);
router.use(orderrouter);

module.exports=router;
