const express = require('express');
const server = express();
const PORT = process.env.PORT || 3000;

server.use(express.json());
server.get('/',  (req, res) =>  {
    res.status(200).send("I am working")
});


module.exports = server