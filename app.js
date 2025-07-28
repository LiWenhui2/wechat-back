//入口文件
const express = require('express')
const app = express()
app.use(express.json())
app.use(express.urlencoded({extended: false}))
//err错误处理函数
app.use((req, res, next) => {
    res.cc = (err, httpCode = 200, status = 1) => {
        res.status(httpCode).send({
            status,
            message: err instanceof Error ? err.message : err
        })
    }
    next()
})
const userRouter = require('./routes/user')
app.use('/api/user', userRouter)
app.listen(1234, () => {
    console.log('http://43.159.41.42:1234')
})