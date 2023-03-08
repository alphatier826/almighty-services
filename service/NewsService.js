const News = require('../modules/News.Schema');

exports.NewsService = {
    getAll: function(res) {
        News.find({}).then(news => {
            res.status(200).json(news)
            })
            .catch(error => next(error));
        }
}