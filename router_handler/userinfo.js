const db = require('../database/index')
const bcrypt = require('bcryptjs')

exports.getUserInfo = (req, res) => {

    const sqlStr = `select id, username, nickname, email, user_pic from user where id=?`
    db.query(sqlStr, req.user.id, (err, results) => {
        if (err) return res.cc(err)

        if (results.length !== 1) return res.cc('getuserinfo failed!')

        res.send({
            status: 0,
            message: 'getuserinfo success!',
            data: results[0]
        })
    })

}

exports.updateUserInfo = (req, res) => {
    const sqlStr = `update user set ? where id = ?`
    db.query(sqlStr, [req.body, req.body.id], (err, results) => {
        if (err) res.cc(err)

        if (results.affectedRows !== 1) return res.cc('updateuserinfo failed!')

        return res.cc('updateuserinfo success!', 0)
    })
}

exports.updatepwd = (req, res) => {
    const sqlStr = `update user set password=? where id=?`
    const newPwd = bcrypt.hashSync(req.body.newpwd, 10)

    db.query(sqlStr, [newPwd, req.body.id], (err, results) => {
        if (err) res.cc(err)

        if (results.affectedRows !== 1) return res.cc('updatepwd failed!')
        
        return res.cc('updatepwd success!', 0)
    })
}

exports.updateavatar = (req, res) => {
    const sqlStr = `update user set user_pic=? where id=?`

    db.query(sqlStr, [req.body.avatar, req.user.id], (err, results) => {
        if (err) res.cc(err)

        if (results.affectedRows !== 1) return res.cc('updateavatar failed!')
        
        return res.cc('updateavatar success!', 0)
    })
}