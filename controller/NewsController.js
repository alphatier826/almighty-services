const express = require('express');
const NewsController = express.Router();
const {NewsService} = require("./../service/NewsService");

NewsController.get("", (req, res) => returnResponse(req, res, NewsService.getAll()));

module.exports = {NewsController};