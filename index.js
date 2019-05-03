require('dotenv');
const server = require('./app.js');



const PORT = process.env.PORT || 5000;

server.listen(PORT, () => console.log(`server listening on ${PORT}`))
