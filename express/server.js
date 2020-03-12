'use strict';
require('dotenv').config();
const express = require('express');
const path = require('path');
const serverless = require('serverless-http');
const app = express();
const bodyParser = require('body-parser');
const TelegramBot = require('node-telegram-bot-api');

const token = process.env.TOKEN;

// Created instance of TelegramBot
const bot = new TelegramBot(token, {
  polling: true
});

// Listener (handler) for showcasing different keyboard layout
bot.onText(/\/transaction/, (msg) => {
  bot.sendMessage(msg.chat.id, 'Select category of transaction', {
    'reply_markup': {
      'keyboard': [
        ['apartment', 'applications'],
        ['business', 'debts'],
        ['entertainment', 'food'],
        ['gifts', 'services'],
        ['shopping', 'transport']
      ],
      resize_keyboard: true,
      one_time_keyboard: true,
      force_reply: true,
    }
  });
});

const router = express.Router();
router.get('/', (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.write('<h1>Hello from Express.js!</h1>');
  res.end();
});
router.get('/another', (req, res) => res.json({ route: req.originalUrl }));
router.post('/', (req, res) => res.json({ postBody: req.body }));


app.use(bodyParser.json());
app.use('/.netlify/functions/server', router);  // path must route to lambda
app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
