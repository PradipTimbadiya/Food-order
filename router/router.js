const userRouter=require('../router/user_router');
const dishRouter=require('../router/dish_router');
const { Router } = require('express');
const router=Router();

router.use(userRouter);
router.use(dishRouter);

module.exports=router;
