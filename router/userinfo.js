const express = require('express');
const router = express.Router();
const userinfoHandle = require('../router_handler/userinfo')
const { update_userinfo_schema , update_password_schema, update_avatar_schema} = require('../schema/user')
const expressJoi = require('@escook/express-joi')

router.get('/userinfo', expressJoi(update_userinfo_schema), userinfoHandle.getUserInfo)
router.post('/userinfo', userinfoHandle.updateUserInfo)
router.get('/updatepwd', expressJoi(update_password_schema), userinfoHandle.updatepwd)
router.get('/updateavatar', expressJoi(update_avatar_schema), userinfoHandle.updateavatar)

module.exports = router