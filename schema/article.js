const joi = require('joi')

const name = joi.string().required()

const id = joi.number().integer().min(1).required()

const title = joi.string().required()
const cate_id = joi.number().integer().min(1).required()
const content = joi.string().required().allow('')
const state = joi.string().valid('已发布', '草稿').required()

exports.add_cate_schema = {
  body: {
    name,
  },
}

exports.delete_cate_schema = {
  params: {
    id,
  },
}

exports.add_article_schema = {
    body: {
      title,
      cate_id,
      content,
      state,
    },
}