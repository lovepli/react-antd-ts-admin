const userController = require('./user');
const newsController = require('./news');



module.exports = {
  news: newsController,
  user: userController
}