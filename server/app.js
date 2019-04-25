const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const app = express();

const registerRoute = require('../routes/registerRoute');







app.use(express.json());
app.use(cors());
app.use(helmet());

app.use(registerRoute);
app.get('/', (req, res,) => {
    res.send(`sanity check success`)
});


module.exports = app;