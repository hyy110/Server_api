const db = require('../database/index')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('../config')

exports.regUser = (req, res) => {
    
    const userinfo = req.body
    if (!userinfo.username || !userinfo.password) 
        return res.cc('username or password is null!')
    

    const sqlStr = `select * from user where username=?`
    db.query(sqlStr, [userinfo.username], function (err, results) {

        if (err) {
          return res.cc(err)
        }

        if (results.length > 0) {
          return res.cc('username already exists!')
        }

        userinfo.password = bcrypt.hashSync(userinfo.password, 10)

        const sqlStr = 'insert into user set ?'
        db.query(sqlStr, { username: userinfo.username, password: userinfo.password }, (err, results) => {

            if (err) return res.cc(err)

            if (results.affectedRows !== 1) {
              return res.cc('register failed！')
            }

            res.cc('register success!', 0)
          })
    })

}

exports.login = (req, res) => {

    const userinfo = req.body
    const sqlStr = 'select * from user where username=?'

    db.query(sqlStr, userinfo.username, (err, results) => {
        if (err) return res.cc(err)

        if (results.length !== 1) return res.cc('login failed!')

        const compareResult = bcrypt.compareSync(userinfo.password, results[0].password)
        if (!compareResult) {
            return res.cc('login failed！')
        }

        const user = { ...results[0], password: '', user_pic: '' }
        const tokenStr = jwt.sign(user, config.jwtSecretKey, {
            expiresIn: '10h'
        })

        res.send({
            status: 0,
            message: 'login success!',
            token: 'Bearer ' + tokenStr
        })
    })
    
}