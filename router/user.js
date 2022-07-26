const express = require('express');
const router = express.Router();
const userHandler = require('../router_handler/user')
const expressJoi = require('@escook/express-joi')
const { reg_login_schema } = require('../schema/user')

router.get('/reguser', expressJoi(reg_login_schema), userHandler.regUser)
router.get('/login', userHandler.login)

module.exports = router