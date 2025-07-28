const bcrypt = require('../utils/bcrypt')
//注册
const {selectUser, insertToUser} = require("../models/userMedels");
const {generateToken} = require("../utils/jwt");
module.exports.register = async (req, res) => {
    const {phone, wechat, QQ, email, confirmPwd} = req.body
    try {
        if ((await selectUser('phone', phone)).length !== 0) return res.cc('手机号已被注册！')
        if ((await selectUser('wechat', phone)).length !== 0) return res.cc('微信号已被注册！！')
        if ((await selectUser('QQ', QQ)).length !== 0) return res.cc(' QQ已被其他账号绑定！')
        if ((await selectUser('email', email)).length !== 0) return res.cc('邮箱已被其他账号绑定！')
        if (req.body.password !== confirmPwd) return res.cc('两次密码输入不一致！')
        //密码加密
        req.body.password = bcrypt.hashPassword(req.body.password)
        //插入数据库
        const insertRes = await insertToUser([phone, wechat, QQ, email, req.body.password])
        if (insertRes.affectedRows !== 1) return res.cc('注册失败！请重试！')
        res.send({
            status: 0,
            message: '注册成功！'
        })
    } catch (err) {
        res.cc(err)
    }
}
//登录
module.exports.login = async (req, res) => {
    try {
        console.log(req.body)
        const {loginType, loginId, password} = req.body
        const loginRes = await selectUser(loginType, loginId)
        if (loginRes.length === 1) {
            const validateRes = bcrypt.validatePassword(password, loginRes[0].password)
            console.log(loginRes)
            if (validateRes) {
                const user = {...loginRes[0], password: ''}
                generateToken(res, user)
            } else {
                return res.cc('用户名或密码错误！')
            }
        }
    } catch (err) {
        return res.cc(err)
    }
}