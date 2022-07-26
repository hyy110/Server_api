const express = require('express');
const app = express();
const cors = require('cors');
const useRouter = require('./router/user')
const useinfoRouter = require('./router/userinfo')
const articleRouter = require('./router/article')
const expressJwt = require('express-jwt')
const config = require('./config')
const joi = require('joi')

app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use((req, res, next) => {
    res.cc = (err, status = 1) => {
        res.send({
            status,
            message: err instanceof Error ? err.message: err
        })
    }

    next()
})
app.use(expressJwt({ secret: config.jwtSecretKey }).unless({ path: [/^\/api\//] }))
app.use('/api', useRouter)
app.use('/my', useinfoRouter)
app.use('/article', articleRouter)
app.use((err, req, res, next) => {  

    if (err instanceof joi.ValidationError) res.cc(err)

    res.cc(err)
    if (err.name === 'UnauthorizedError') return res.cc('token failed!')

  })

app.listen(80, () => {
    console.log('api_sever running at http://127.0.0.1');
})