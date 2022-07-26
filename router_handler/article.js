const db = require('../database/index')
const path = require('path')


exports.getclassfication = (req, res) => {
    const sqlStr = `select * from article_classfication where is_delete = 0 order by id asc`

    db.query(sqlStr, (err, results) => {
        if (err) return res.cc(err)

        if (results.length < 1) return res.cc('getclassfication failed!')

        res.send({
            status: 0,
            message: 'getclassfication success!',
            data: results
        })
    })
}

exports.addclassfication = (req, res) => {
    const sqlStr = `select * from article_classfication where name=?`

    db.query(sqlStr, [req.body.name], (err, results) => {
        if (err) return res.cc(err)

        if (results.length >= 1) return res.cc('articleclassfication already exists!')

        const sqlStr = `insert into article_classfication set ? `

        db.query(sqlStr, req.body,(err, results) => {
            if (err) return res.cc(err)

            if (results.affectedRows !== 1) return res.cc('addclassfication failed!')

            res.cc('addclassfication success!', 0)
        })
    })
}

exports.deleteclassfication = (req, res) => {
    const sqlStr = `select * from article_classfication where name=?`

    db.query(sqlStr, [req.body.name], (err, results) => {
        if (err) return res.cc(err)

        if (results.length === 0) return res.cc('articleclassfication is not exists!')

        const sqlStr = `update article_classfication set is_delete=1 where name=?`

        db.query(sqlStr, req.body.name, (err, results) => {
            if (err) return res.cc(err)

            if (results.affectedRows !== 1) return res.cc('deleteclassfication failed!')

            res.cc('deleteclassfication success!', 0)
        })
    })
}

exports.addarticle = (req, res) => {

    if (!req.file || req.file.fieldname !== 'cover_img') return res.cc('you must choose your article picture!')
    
    const articleInfo = {
        ...req.body,
        cover_img: path.join('/uploads', req.file.filename),
        pub_date: new Date(),
        author_id: req.user.id,
    }

    const sqlStr = `insert into article set ?`

    db.query(sqlStr, articleInfo, (err, results) => {
        if (err) return res.cc(err)

        if (results.affectedRows !== 1) return res.cc('addarticle failed！')

 
         res.cc('addarticle success!', 0)
      })
}