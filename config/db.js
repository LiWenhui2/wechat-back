//数据库
const mysql = require('mysql')
module.exports.db = mysql.createPool({
    host: '43.159.41.42',
    user: 'root',
    password: 'li11223344li',
    database: 'wechat'
})