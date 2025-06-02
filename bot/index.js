// bot/index.js
import dotenv from 'dotenv';
import TelegramBot from 'node-telegram-bot-api';
import cron from 'node-cron';
import { connectDB } from './src/utils/db.js';
import  User  from './src/models/User.js';
import { getWeather } from './src/utils/weather.js';

dotenv.config();

const bot = new TelegramBot(process.env.BOT_TOKEN, { polling: true });

await connectDB();

bot.onText(/\/start/, (msg) => {
  bot.sendMessage(msg.chat.id, `👋 Welcome, ${msg.from.first_name}!\nUse /subscribe to get daily weather updates.`);
});

const waitingForCity = new Map();

bot.onText(/\/subscribe/, async(msg) => {
  const chatId = msg.chat.id;
  const isUserPresent = await User.findOne({telegramId:chatId})
  if(isUserPresent){
    bot.sendMessage(chatId, `You are already Subscribed for this city:${isUserPresent?.city}`);
    return ;
  }  
  bot.sendMessage(chatId, 'Please enter your city for weather updates:');
  waitingForCity.set(chatId, true);
});

bot.on('message', async (msg) => {
  const chatId = msg.chat.id;
  const text = msg.text;

  if (waitingForCity.get(chatId)) {
    const city = text.trim();
    const telegramId = msg.from.id;

    try {
      await User.findOneAndUpdate(
        { telegramId },
        { telegramId, subscribed: true, city },
        { upsert: true, new: true }
      );
      bot.sendMessage(chatId, `✅ Subscribed to weather updates for ${city}!`);
    } catch (err) {
      bot.sendMessage(chatId, `❌ Subscription failed.`);
    }

    waitingForCity.delete(chatId); 
  }
});


cron.schedule('*/30 * * * * *', async () => {
  const users = await User.find({ subscribed: true, blocked: false });
  for (const user of users) {
    const weather = await getWeather(user.city);
    bot.sendMessage(user.telegramId, weather);
  }
});
