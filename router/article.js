const express = require('express')
const router = express.Router()
const articleHandle = require('../router_handler/article')
const multer = require('multer')
const path = require('path')
const upload = multer({dest: path.join(__dirname, '../uploads')})
const expressJoi = require('@escook/express-joi')
const { add_article_schema, add_cate_schema, delete_cate_schema } = require('../schema/article')

router.get('/classfication', articleHandle.getclassfication)
router.get('/addclassfication', expressJoi(add_cate_schema), articleHandle.addclassfication)
router.get('/deleteclassfication', expressJoi(delete_cate_schema), articleHandle.deleteclassfication)
router.get('/addarticle', upload.single('cover_img'), expressJoi(add_article_schema), articleHandle.addarticle)

module.exports = router