# Telegram Weather Bot

A full-stack monorepo for a Telegram bot that provides weather updates, with an admin panel and a React frontend.

---

## Project Structure

```
/telegram_bot
├── backend/    # Express.js API server and logic
├── bot/        # Telegram bot scripts and handlers
├── frontend/   # React.js admin panel UI
├── .gitignore
├── README.md
└── package.json
```

---

## Environment Variables

Each module uses its own `.env` file:

- **backend/.env**
  ```
  JWT_SECRET=your_jwt_secret_key
  MONGO_URI=your_mongodb_connection_string
  ```

- **bot/.env**
  ```
  TELEGRAM_BOT_TOKEN=your_telegram_bot_token
  MONGO_URI=your_mongodb_connection_string
  OPENWEATHER_API_KEY=your_openweather_api_key
  ```

- **frontend/.env**
  ```
  VITE_API_BASE_URL=http://localhost:PORT_OR_YOUR_API_BASE_URL
  ```

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB

### Setup

1. **Clone the repo:**
   ```bash
   git clone https://github.com/niteshsainicoder/telegram_bot.git
   cd telegram_bot
   ```

2. **Add `.env` files** in `backend/`, `bot/`, and `frontend/` as described above.

3. **Install dependencies:**
   ```bash
   cd backend && npm install
   cd ../bot && npm install
   cd ../frontend && npm install
   ```

4. **Start each service:**

   - **Backend:**
     ```bash
     cd backend
     npm run test
     ```

   - **Bot:**
     ```bash
     cd ../bot
     npm run test
     ```

   - **Frontend:**
     ```bash
     cd ../frontend
     npm run dev
     ```

---

## Notes

- `.gitignore` excludes all `node_modules` and sensitive files.
- Never commit your `.env` files.
- Customize ports and URLs as needed.

---

## Contact

- **Nitesh Saini**
- Email: saininitesh582@gmail.com
- Portfolio: [niteshdev.vercel.app](https://niteshdev.vercel.app)
- GitHub: [niteshsainicoder](https://github.com/niteshsainicoder)
- LinkedIn: [nitesh-saini-dev](https://linkedin.com/in/nitesh-saini-dev)

---

## License

MIT License

---

*Let me know if you want deployment instructions, API docs, bot usage, or screenshots added!*
