const models = require('../models');

const News = models.News;

const getList = async (ctx) => {
  const result = await News.find();
  ctx.body = result.map(item => ({
    id: item._id,
    title: item.title,
    content: item.content
  }))
}

const getDetail = async (ctx) => {
  const id = ctx.query.id;
  const result = await News.findById(id);
  ctx.body = result;
}

const edit = async (ctx) => {
  const body = ctx.request.body;
  if (body.id) {
    const result = await News.findByIdAndUpdate(body.id, {
      title: body.title,
      content: body.content
    });

    ctx.body = result;
  } else {
    const news = new News({
      title: body.title,
      content: body.content
    })
    const result = await news.save();
    ctx.body = result;
  }
}


module.exports = {
  getList,
  getDetail,
  edit
}