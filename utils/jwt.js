//生成token字符串
const jwt = require('jsonwebtoken')
module.exports.generateToken = (res, payload) => {
    const tokenStr = jwt.sign(payload, 'lwh is handsome', {expiresIn: '72h'})
    res.status(200).send({
        status: 0,
        message: '登录成功！',
        token: 'Bearer ' + tokenStr
    })
}


