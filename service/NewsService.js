const News = require('../modules/News.Schema');

exports.NewsService = {
    getAll: function() {
        News.find({}).then(news => {
            console.log(news);
            })
            .catch(error => next(error));
        }
}