const {db} = require('../config/db')
const {reject} = require("nodemailer/.ncurc");
//新用户注册
module.exports.insertToUser = (user) => {
    return new Promise((resolve, reject) => {
        const sql = 'INSERT INTO user (phone,wechat,QQ,email,password) VALUES (?,?,?,?,?)'
        db.query(sql, user, (err, res) => {
            if (err) return reject(err)
            return resolve(res)
        })
    })
}
//查找用户
module.exports.selectUser = (filed, value) => {
    return new Promise((resolve, reject) => {
        const sql = `SELECT *
                     FROM user
                     WHERE ?? = ?`
        db.query(sql, [filed, value], (err, res) => {
            if (err) return reject(err)
            return resolve(res)
        })
    })
}