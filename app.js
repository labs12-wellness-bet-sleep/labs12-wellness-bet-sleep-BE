const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();

const db = require('./database/dbConfig');

const usersRouter = require('./routes/userRoutes.js');
const groupRouter = require('./routes/groupRoutes.js');


app.use(express.json());
app.use(cors());
app.use(helmet());

//app working!
app.get('/', (req, res,) => {
    res.send(`sanity check success`)
});

app.use('/api/users', usersRouter);
app.use('/api/groups', groupRouter)

module.exports = app;

// DATABASE_HOST = localhost
// DATABASE = postgres
// DATABASE_USER = postgres
// DATABASE_PASSWORD = lambdalabs
