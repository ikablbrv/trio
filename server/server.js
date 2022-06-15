require('dotenv').config()

const express = require('express');
const sequelize = require('./config/db.config')
const models = require('./models/models')
const router = require('./routes/routes')
const cors = require('cors')

const PORT = process.env.PORT || 8888;

const app = express();
app.use(cors())
app.use(express.json())
app.use('/api', router)
app.use(express.static(__dirname + '/public'))
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
})
// Обработка ошибок, последний Middleware
// app.use(errorHandler)

const start = async () => {
  try {
    // подключаемся к БД
    await sequelize.authenticate();
    await sequelize.sync();
    // Слушаем сервер
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}.`);
    });
  } catch (error) {
    console.error(error)
  }
}

start();

