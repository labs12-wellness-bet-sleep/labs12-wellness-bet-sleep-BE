const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();

app.use(express.json());
app.use(cors());
app.use(helmet());

//app working!
app.get('/', (req, res,) => {
    res.send(`sanity check success`)
});

app.use('/api/users', usersRouter);




module.exports = app;

