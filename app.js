const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();

const db = require('./database/dbConfig');

const usersRouter = require('./controllers/index.js');
// const registerLogInRouter = require('./controllers/users.js');

app.use(express.json());
app.use(cors());
app.use(helmet());

//app working!
app.get('/', (req, res,) => {
    res.send(`sanity check success`)
});

app.use('/api/users', usersRouter);
// app.use('/', registerLogInRouter);


module.exports = app;

// DATABASE_HOST = localhost
// DATABASE = postgres
// DATABASE_USER = postgres
// DATABASE_PASSWORD = lambdalabs
