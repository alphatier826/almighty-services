const express = require('express');
const NewsController = express.Router();
const {NewsService} = require("./../service/NewsService");

NewsController.get("", (req, res) => NewsService.getAll(res));

module.exports = {NewsController};