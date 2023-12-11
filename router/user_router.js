const { Router } = require('express');
const UserController = require('../controller/user_controller');
const router = Router();

router.post("/sign-up",UserController.signUp);

router.post("/sign-in",UserController.signIn);

router.get("/user-data",UserController.userData);

module.exports = router;