const express = require('express')
const {register, login} = require("../controllers/userCtrl");
const router = express.Router()
//注册新用户
router.post('/register', register)
//用户登录
router.post('/login', login)
module.exports = router