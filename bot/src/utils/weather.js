// bot/utils/weather.js
import axios from 'axios';
import dotenv from 'dotenv';
import { weatherApiKey } from './db.js';

dotenv.config();

export async function getWeather(city) {
  const apiKey =  weatherApiKey ;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const { data } = await axios.get(url);
    return `🌤 Weather in ${city}:\n🌡 Temp: ${data.main.temp}°C\n💧 Humidity: ${data.main.humidity}%\n🌬 Wind: ${data.wind.speed} m/s`;
  } catch (err) {
    return '❌ Could not fetch weather data.';
  }
}
